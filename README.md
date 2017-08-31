# light-pdf-viewer

## Features

A light component to preview pdf files, offer toolbox with pager, zoomer and download, etc.

## Install

```Bash
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

[Online demo](http://achuan.me/light-pdf-viewer.github.io/)
