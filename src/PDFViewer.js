import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viewer from './components/viewer';
import ToolBar from './components/toolbar';
import '../assets/index.less';

class PDFViewer extends Component {
  static propTypes = {
    options: PropTypes.object,
    URI: PropTypes.string.isRequired
  };

  static defaultProps = {
    options: {
      tooltip: true,
      toolbar: false,
      textLayer: true
    },
    URI: '/public/pdf/4.pdf'
  };

  render() {
    const { options, URI } = this.props;
    const { toolbar } = options;
    return (
      <div className="PDFViewer">
        {toolbar && <ToolBar URI={URI} options={options} />}
        <Viewer {...this.props} />
      </div>
    );
  }
}

export default PDFViewer;
