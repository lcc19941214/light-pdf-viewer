import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ToolBox from './toolBox';
import utils, {
  noop,
  PREVIEW_BOX_WIDTH,
  INITIAL_SCALE,
  RESOLUTION_SCALE,
  MIN_SCALE,
  MAX_SCALE,
  SCALE_STEP,
  FIX_CSS_UNIT
} from '../utils/utils';

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
    file: PropTypes.string.isRequired,
    options: PropTypes.object,
    onDownload: PropTypes.func
  };

  static defaultProps = {
    options: {}
  };

  constructor(...args) {
    super(...args);

    this.handleZoom = utils.throttle(this.handleZoom, 400);
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

    const { file = {} } = this.props;
    this.loadDocument(file, { textLayer: true });

    window.addEventListener('scroll', this.handlePageScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlePageScroll, false);
  }

  getPages = () => [...$$('.pdf-viewer-wrapper .page')];

  loadDocument = (file, options = {}) => {
    PDFJS.getDocument(file)
      .then(pdfDocument => {
        const PAGE_COUNT = pdfDocument.numPages;
        this.setState({
          pdfDocument,
          pageCount: PAGE_COUNT,
          currentPage: 1
        });
        window.pdfDocument = pdfDocument;
        return { pdfDocument, options };
      })
      .then(({ pdfDocument, options }) => this.renderPDF(pdfDocument, options))
      .catch(err => {
        // PDF loading error
        switch (err.name) {
          case 'UnexpectedResponseException': // 请求失败
            break;
          case 'InvalidPDFException': // 非法pdf文件
          default:
        }
        console.log(err);
      });
  };

  renderPDF = (pdfDocument, options) => {
    const { scale = INITIAL_SCALE } = options;

    const container = this.container;
    utils.removeChildren(container);

    const PAGE_COUNT = pdfDocument.numPages;

    const taskList = [];

    for (let page = 1; page <= PAGE_COUNT; page++) {
      pdfDocument.getPage(page).then(pdfPage => {
        window[`pdfPage${page}`] = pdfPage;
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
  };

  // zoom in and and zoom out
  handleZoomIn = () => {
    const { scale } = this.state;
    this.handleZoom(parseFloat((scale + SCALE_STEP).toFixed(1)), scale);
  };
  handleZoomOut = () => {
    const { scale } = this.state;
    this.handleZoom(parseFloat((scale - SCALE_STEP).toFixed(1)), scale);
  };
  handleZoomToggle = () => {
    const { scale } = this.state;
    const finalScale =
      scale > INITIAL_SCALE
        ? INITIAL_SCALE
        : parseFloat(
            (INITIAL_SCALE / PREVIEW_BOX_WIDTH * utils.deviceWidth(40)).toFixed(5)
          );
    this.handleZoom(finalScale, scale);
  };
  handleZoom = (scale, oldScale = INITIAL_SCALE) => {
    if (scale <= MAX_SCALE && scale >= MIN_SCALE) {
      this.setState({ scale });

      const { options: preOptions } = this.props;
      const { pdfDocument } = this.state;
      const options = Object.assign({}, preOptions, { scale });
      const oldWidth = this.container.clientWidth;

      this.renderPDF(pdfDocument, options).then(taskList => {
        const width = this.container.clientWidth;
        this.resizeWrapper(width, oldWidth);
      });
    }
  };
  resizeWrapper = (width, oldWidth) => {
    const deviceWidth = utils.deviceWidth(40);
    const align = Math.floor((width - deviceWidth) / 2);
    const preScrollLeft = this.viewerElem.scrollLeft;
    const preAlign = Math.floor((oldWidth - deviceWidth) / 2);
    if (width > deviceWidth) {
      if (oldWidth < deviceWidth || preScrollLeft === preAlign) {
        this.viewerElem.scrollLeft = align;
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
    const { onDownload, file } = this.props;
    if (utils.isFunc(onDownload)) {
      e.preventDefault();
      onDownload(file);
    }
  }

  render() {
    const { options: { tooltip }, file } = this.props;
    const { pageCount, currentPage, scale } = this.state;
    return (
      <div className="pdf-viewer-wrapper">
        <div className="pdfViewer pdf-viewer" />
        {tooltip &&
          pageCount > 0 &&
          <ToolBox
            file={file}
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
