import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ToolBox from './toolBox';
import utils from '../utils/utils';
import {
  PREVIEW_BOX_WIDTH,
  INITIAL_SCALE,
  MIN_SCALE,
  MAX_SCALE,
  SCALE_STEP,
  FIX_CSS_UNIT
} from '../utils/constant';

require('pdfjs-dist/build/pdf');

const pdfjsLib = require('pdfjs-dist/web/pdf_viewer');

const PDFJS = pdfjsLib.PDFJS;
PDFJS.workerSrc = 'https://cdn.bootcss.com/pdf.js/1.9.448/pdf.worker.min.js';

const { $, $$ } = utils;

function composeParams(params = {}, options = {}) {
  const { textLayer, annotationLayer } = options;
  const _params = Object.assign({}, params);
  if (textLayer) {
    _params.textLayerFactory = new PDFJS.DefaultTextLayerFactory();
  }
  if (annotationLayer) {
    _params.annotationLayerFactory = new PDFJS.DefaultAnnotationLayerFactory();
  }
  return _params;
}

class Viewer extends Component {
  static propTypes = {
    URI: PropTypes.string.isRequired,
    options: PropTypes.object,
    scrollTarget: PropTypes.instanceOf(HTMLElement),
    cache: PropTypes.object,
    onDownload: PropTypes.func
  };

  constructor(...args) {
    super(...args);

    this.cache = this.props.cache || {};
    this.scrollTarget = utils.isElement(this.props.scrollTarget) ? this.props.scrollTarget : window;
    this.handleZoom = utils.throttle(this.handleZoom, 200);
    this.handlePageScroll = utils.throttle(this.handlePageScroll, 300);
  }

  state = {
    pdfDocument: null,
    pageCount: 0,
    currentPage: 0,
    scale: INITIAL_SCALE
  };

  componentDidMount() {
    this.viewerElem = ReactDOM.findDOMNode(this);
    this.container = this.viewerElem.querySelector('.pdf-viewer');

    this.scrollTarget.addEventListener('scroll', this.handlePageScroll, false);

    const { URI = {}, options } = this.props;
    if (this.cache[URI]) {
      this.loadCache(this.cache[URI], options);
    } else {
      this.loadDocument(URI, options);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { URI = {}, options } = nextProps;
    if (this.props.URI !== URI) {
      if (this.cache[URI]) {
        this.loadCache(this.cache[URI], options);
      } else {
        this.loadDocument(URI, options);
      }
    }
  }

  componentWillUnmount() {
    this.scrollTarget.removeEventListener('scroll', this.handlePageScroll, false);

    if (!this.props.cache) {
      this.cache = null;
    }
  }

  getPages = () => [...$$('.pdf-viewer-wrapper .page')];

  loadDocument = (URI, options = {}) => {
    PDFJS.getDocument(URI)
      .then(pdfDocument => {
        this.cache[URI] = pdfDocument;
        this.handleLoadDocument(pdfDocument, options);
      })
      .catch(err => {
        console.log(err);
      });
  };
  loadCache = (pdfDocument, options) => this.handleLoadDocument(pdfDocument, options)
  handleLoadDocument = (pdfDocument, options = {}) => {
    const PAGE_COUNT = pdfDocument.numPages;
    this.setState({
      pdfDocument,
      pageCount: PAGE_COUNT,
      currentPage: 1
    });

    this.renderPDF(pdfDocument, options)
      .catch(err => {
        console.log(err);
      });
  }

  renderPDF = (pdfDocument, options) => {
    utils.removeChildren(this.container);

    return this.makeRender(pdfDocument, options);
  };
  makeRender = (pdfDocument = this.state.pdfDocument, options, container = this.container) => {
    const { scale = INITIAL_SCALE } = options;
    const PAGE_COUNT = pdfDocument.numPages;
    const taskList = [];

    for (let page = 1; page <= PAGE_COUNT; page++) {
      pdfDocument.getPage(page).then(pdfPage => {
        const scaledViewport = pdfPage.getViewport(INITIAL_SCALE);
        const renderScale = PREVIEW_BOX_WIDTH / scaledViewport.width;

        const params = {
          container,
          id: page,
          scale: parseFloat((renderScale * FIX_CSS_UNIT * scale).toFixed(5)),
          defaultViewport: scaledViewport
        };

        const pdfPageView = new PDFJS.PDFPageView(composeParams(params, options));
        pdfPageView.setPdfPage(pdfPage);

        const renderTask = pdfPageView.draw();
        taskList.push(renderTask);
      });
    }

    return Promise.all(taskList);
  }

  // zoom in and and zoom out
  handleZoomIn = () => {
    const { scale } = this.state;
    if (scale < MAX_SCALE) {
      let finalScale = parseFloat((scale + SCALE_STEP).toFixed(1));
      if (finalScale > MAX_SCALE) finalScale = MAX_SCALE;
      this.handleZoom(finalScale, scale);
    }
  };
  handleZoomOut = () => {
    const { scale } = this.state;
    if (scale > MIN_SCALE) {
      let finalScale = parseFloat((scale - SCALE_STEP).toFixed(1));
      if (finalScale < MIN_SCALE) finalScale = MIN_SCALE;
      this.handleZoom(finalScale, scale);
    }
  };
  handleZoomToggle = () => {
    const { scale } = this.state;
    let finalScale =
      scale > INITIAL_SCALE
        ? INITIAL_SCALE
        : parseFloat(
            ((INITIAL_SCALE / PREVIEW_BOX_WIDTH) * utils.deviceWidth(40)).toFixed(5)
          );
    if (finalScale > MAX_SCALE) finalScale = MAX_SCALE;
    this.handleZoom(finalScale, scale);
  };
  handleZoom = (scale, oldScale = INITIAL_SCALE) => {
    if (scale <= MAX_SCALE && scale >= MIN_SCALE) {
      this.setState({ scale });

      const { options: preOptions } = this.props;
      const { pdfDocument } = this.state;
      const options = Object.assign({}, preOptions, { scale });
      const oldWidth = this.container.clientWidth;
      const oldScrollLeft = this.viewerElem.scrollLeft;

      this.renderPDF(pdfDocument, options).then(() => {
        const width = this.container.clientWidth;
        this.resizeWrapper(width, oldWidth, oldScrollLeft);
      });
    }
  };
  resizeWrapper = (width, oldWidth, oldScrollLeft) => {
    const deviceWidth = utils.deviceWidth(40);
    const align = Math.floor((width - deviceWidth) / 2);
    const preAlign = Math.floor((oldWidth - deviceWidth) / 2);
    if (width > deviceWidth) {
      if (oldWidth < deviceWidth || oldScrollLeft === preAlign) {
        this.viewerElem.scrollLeft = align;
      } else if (oldScrollLeft !== preAlign) {
        this.viewerElem.scrollLeft = oldScrollLeft;
      }
    }
  };

  // throttle
  handlePageScroll = () => {
    const pages = this.getPages();
    const len = pages.length;
    if (len > 1) {
      const H = window.innerHeight;
      const halfH = H / 2;
      for (let i = 0; i < len; i++) {
        const { top, bottom } = pages[i].getBoundingClientRect();
        if (top < halfH && bottom > halfH) {
          this.setState({ currentPage: i + 1 });
          break;
        }
      }
    }
  };

  handleDownload = (e) => {
    const { onDownload, URI } = this.props;
    if (utils.isFunc(onDownload)) {
      e.preventDefault();
      onDownload(URI);
    }
  }

  render() {
    const { options: { tooltip }, URI } = this.props;
    const { pageCount, currentPage, scale } = this.state;
    return (
      <div className="pdf-viewer-wrapper">
        <div className="pdfViewer pdf-viewer" />
        {tooltip &&
          pageCount > 0 &&
          <ToolBox
            URI={URI}
            scale={scale}
            pageCount={pageCount}
            currentPage={currentPage}
            handleZoomIn={this.handleZoomIn}
            handleZoomOut={this.handleZoomOut}
            handleZoomToggle={this.handleZoomToggle}
            handleDownload={this.handleDownload}
          />}
      </div>
    );
  }
}

export default Viewer;
