import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viewer from './components/viewer';
import ToolBar from './components/toolbar';
import '../assets/index.less';

class PDFViewer extends Component {
  static propTypes = {
    options: PropTypes.object,
    file: PropTypes.string.isRequired,
    onDownload: PropTypes.func
  };

  static defaultProps = {
    options: {
      tooltip: true,
      toolbar: false
    },
    file: '/public/pdf/1.pdf'
  };

  render() {
    const { options, file } = this.props;
    const { toolbar } = options;
    return (
      <div className="PDFViewer">
        {toolbar && <ToolBar file={file} options={options} />}
        <Viewer {...this.props} />
      </div>
    );
  }
}

export default PDFViewer;
