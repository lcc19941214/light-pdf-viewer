import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

require('pdfjs-dist/build/pdf');

const pdfjsLib = require('pdfjs-dist/web/pdf_viewer');
const PDFJS = pdfjsLib.PDFJS;

PDFJS.workerSrc = 'https://cdn.bootcss.com/pdf.js/1.9.448/pdf.worker.min.js';

// pdfjs-dist/lib/web/ui_uitls.js
// scale may get multiplied with CSS_UNIT and scaled into 1.33333
// use FIX_CSS_UNIT to fix this auto scale
const FIX_CSS_UNIT = 1 / (96.0 / 72.0);

const PREVIEW_BOX_WIDTH = 800;
const INITIAL_SCALE = 1.0;

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
    file: PropTypes.string.isRequired
  };

  state = {
    pdfDocument: null,
    pageCount: 0,
    scale: INITIAL_SCALE
  };

  componentDidMount() {
    this.viewerElem = ReactDOM.findDOMNode(this);
    this.container = this.viewerElem.querySelector('.pdfViewer');
    const { file = {} } = this.props;
    this.loadFile(file, { textLayer: true });
  }

  loadFile(file, options = {}) {
    const container = this.container;

    PDFJS.getDocument(file)
      .then(pdfDocument => {
        const PAGE_COUNT = pdfDocument.numPages;
        for (let page = 1; page <= PAGE_COUNT; page++) {
          pdfDocument.getPage(page).then(pdfPage => {
            const scaledViewport = pdfPage.getViewport(INITIAL_SCALE);
            const scale = PREVIEW_BOX_WIDTH / scaledViewport.width;

            const params = {
              container,
              id: page,
              scale: scale * FIX_CSS_UNIT,
              defaultViewport: scaledViewport
            };

            const pdfPageView = new PDFJS.PDFPageView(composeParams(params, options));
            console.log(pdfPageView);

            pdfPageView.setPdfPage(pdfPage);

            const renderTask = pdfPageView.draw();
            renderTask.then(() => {
              if (page === 1) {
              }
            });
          });
        }
      })
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
  }

  render() {
    return (
      <div className="pdf-viewer-wrapper">
        <div className="pdfViewer pdf-viewer" />
      </div>
    );
  }
}

export default Viewer;
