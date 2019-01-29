# light-pdf-viewer

## Features

A light component to preview pdf files, offer toolbox with pager, zoomer and download, etc.

## Install

`light-pdf-viewer` is dependant on `pdfjs-dist` so make sure you have installed it in advance.

```Bash
npm install --save pdfjs-dist@1.9.456
npm install --save react-light-pdf-viwer
```

## Usage

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PDFViewer from 'react-light-pdf-viewer';

ReactDOM.render(
  <PDFViewer URI="URI or dataurl of your pdf" />,
  document.getElementById('root')
);

```

[Online demo](https://lcc19941214.github.io/light-pdf-viewer.github.io/)
