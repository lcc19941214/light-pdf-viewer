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
    options: PropTypes.object
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
    this.container.style.zoom = 1 / RESOLUTION_SCALE;

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
    const container = this.container;
    const PAGE_COUNT = pdfDocument.numPages;

    const taskList = [];

    for (let page = 1; page <= PAGE_COUNT; page++) {
      const pageContainer = document.createElement('div');
      pageContainer.className = 'page-container';
      container.appendChild(pageContainer);

      pdfDocument.getPage(page).then(pdfPage => {
        const scaledViewport = pdfPage.getViewport(INITIAL_SCALE);
        const renderScale = PREVIEW_BOX_WIDTH / scaledViewport.width * RESOLUTION_SCALE;

        const params = {
          container: pageContainer,
          id: page,
          scale: parseFloat((renderScale * FIX_CSS_UNIT).toFixed(5)),
          defaultViewport: scaledViewport
        };

        const pdfPageView = new PDFJS.PDFPageView(composeParams(params, options));
        pdfPageView.setPdfPage(pdfPage);

        const renderTask = pdfPageView.draw();
        taskList.push(renderTask);
      });
    }

    Promise.all(taskList).then(() => {});
  };

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
            (INITIAL_SCALE / PREVIEW_BOX_WIDTH * utils.deviceWidth(40)).toFixed(1)
          );
    this.handleZoom(finalScale, scale);
  };

  // throttle
  handleZoom = (scale, oldScale = INITIAL_SCALE) => {
    if (scale <= MAX_SCALE && scale >= MIN_SCALE) {
      this.setState({ scale });
      const pages = this.getPages();
      let initialContainerWidth;
      let initialContainerHeight;
      pages.forEach(page => {
        const pageContainer = page.parentNode;
        // pageContainer clientWidth changed after previous sibling element changed
        page.style.transform = `scale(${scale})`;

        if (!initialContainerWidth && !initialContainerHeight) {
          initialContainerWidth = pageContainer.clientWidth / oldScale;
          initialContainerHeight = pageContainer.clientHeight / oldScale;
        }
        pageContainer.style.width = `${initialContainerWidth * scale}px`;
        pageContainer.style.height = `${initialContainerHeight * scale}px`;
      });

      this.resizeWrapper();
    }
  };

  // throttle
  handlePageScroll = () => {
    const pages = this.getPages();
    const len = pages.length;
    if (len > 1) {
      const H = window.innerHeight;
      const halfH = H / RESOLUTION_SCALE;
      for (let i = 0; i < len; i++) {
        const { top, bottom } = pages[i].getBoundingClientRect();
        if (top / RESOLUTION_SCALE < halfH && bottom / RESOLUTION_SCALE > halfH) {
          this.setState({ currentPage: i + 1 });
          break;
        }
      }
    }
  };

  resizeWrapper = () => {
    const width = this.container.clientWidth / RESOLUTION_SCALE;
    const deviceWidth = utils.deviceWidth(40);
    if (width > deviceWidth) {
      this.viewerElem.scrollLeft = (width - deviceWidth) / 2;
    }
  }

  render() {
    const { options: { tooltip } } = this.props;
    const { pageCount, currentPage, scale } = this.state;
    return (
      <div className="pdf-viewer-wrapper">
        <div className="pdfViewer pdf-viewer" />
        {tooltip &&
          pageCount > 0 &&
          <ToolBox
            scale={scale}
            pageCount={pageCount}
            currentPage={currentPage}
            handleZoomIn={this.handleZoomIn}
            handleZoomOut={this.handleZoomOut}
            handleZoomToggle={this.handleZoomToggle}
          />}
      </div>
    );
  }
}

export default Viewer;
