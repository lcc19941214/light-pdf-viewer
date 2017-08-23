import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import ToolBox from './toolBox';
import utils, {
  noop,
  PREVIEW_BOX_WIDTH,
  INITIAL_SCALE,
  MIN_SCALE,
  MAX_SCALE,
  SCALE_STEP,
  FIX_CSS_UNIT
} from '../utils/utils';

require('pdfjs-dist/build/pdf');

const pdfjsLib = require('pdfjs-dist/web/pdf_viewer');
const PDFJS = pdfjsLib.PDFJS;
PDFJS.workerSrc = 'https://cdn.bootcss.com/pdf.js/1.9.448/pdf.worker.min.js';

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

    this.handleZoom = utils.debounce(this.handleZoom.bind(this), 200);
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
    this.container = this.viewerElem.querySelector('.pdfViewer');
    const { file = {} } = this.props;
    this.loadDocument(file, { textLayer: true });

    window.addEventListener('scroll', this.handlePageScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlePageScroll, false);
  }

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
    utils.removeChildren(container);

    const { scale = INITIAL_SCALE, beforeRender = noop } = options;
    const PAGE_COUNT = pdfDocument.numPages;

    for (let page = 1; page <= PAGE_COUNT; page++) {
      pdfDocument.getPage(page).then(pdfPage => {
        const scaledViewport = pdfPage.getViewport(INITIAL_SCALE);
        const renderScale = PREVIEW_BOX_WIDTH / scaledViewport.width;

        const params = {
          container,
          id: page,
          scale: renderScale * FIX_CSS_UNIT * scale,
          defaultViewport: scaledViewport
        };

        const pdfPageView = new PDFJS.PDFPageView(composeParams(params, options));
        pdfPageView.setPdfPage(pdfPage);

        beforeRender(pdfPageView);
        const renderTask = pdfPageView.draw();
        renderTask.then(() => {
          if (page === 1) {

          }
        });
      });
    }
  };

  handleZoomIn = () => {
    const { scale } = this.state;
    this.handleZoom(parseFloat((scale + SCALE_STEP).toFixed(2)));
  };

  handleZoomOut = () => {
    const { scale } = this.state;
    this.handleZoom(parseFloat((scale - SCALE_STEP).toFixed(2)));
  };

  handleZoomToggle = () => {
    const { scale } = this.state;
    const finalScale = scale > 1 ? 1 : (1 / PREVIEW_BOX_WIDTH) * utils.deviceWidth();
    this.handleZoom(finalScale);
  }

  // debounced
  handleZoom = scale => {
    if (scale <= MAX_SCALE && scale >= MIN_SCALE) {
      const { options } = this.props;
      const { pdfDocument } = this.state;
      this.setState({ scale });
      this.renderPDF(pdfDocument, Object.assign({}, options, {
        scale,
        beforeRender: this.resizeWrapper
      }));
    }
  };

  resizeWrapper = (pdfPageView) => {
    const { viewport: { width } } = pdfPageView;
    const deviceWidth = utils.deviceWidth();
    if (width > deviceWidth) {
      this.viewerElem.scrollLeft = (width - deviceWidth) / 2;
    }
  }

  // throttle
  handlePageScroll = () => {
    let pages = this.container.querySelectorAll('.page');
    pages = Array.prototype.slice.call(pages);
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
