import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/index.less';

import Viewer from './components/viewer';

class PDFViewer extends Component {
  static propTypes = {
    options: PropTypes.object,
    file: PropTypes.string.isRequired
  };

  static defaultProps = {
    options: {
      tooltip: true
    },
    file: '/public/pdf/1.pdf'
  };

  render() {
    const { options, file } = this.props;
    return <Viewer file={file} options={options} />;
  }
}

export default PDFViewer;
