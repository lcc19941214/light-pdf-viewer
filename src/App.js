import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/index.less';

import Viewer from './components/viewer';

class PDFViewer extends Component {
  static propTypes = {
    options: PropTypes.object,
    file: PropTypes.string.isRequired
  }

  static defaultProps = {
    options: {},
    file: '/public/pdf/3.pdf'
  }

  render() {
    const { options, file } = this.props;
    return (
      <Viewer file={file} />
    );
  }
}

export default PDFViewer;
