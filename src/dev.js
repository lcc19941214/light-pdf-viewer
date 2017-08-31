import React from 'react';
import ReactDOM from 'react-dom';
import PDFViewer from './PDFViewer';

ReactDOM.render(
  <PDFViewer URI="/public/pdf/example.pdf" />,
  document.getElementById('root')
);
