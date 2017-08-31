import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viewer from './components/viewer';
import ToolBar from './components/toolBar';
import './style/index.less';

class PDFViewer extends Component {
  static propTypes = {
    options: PropTypes.object,
    URI: PropTypes.string.isRequired
  };

  static defaultProps = {
    options: {
      toolbox: true,
      toolbar: false,
      textLayer: true
    },
    URI: ''
  };

  componentWillMount() {
    if (!this.props.URI) this.handleMissURI();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.URI) this.handleMissURI();
  }

  handleMissURI() {
    console.error('props URI is required');
  }

  render() {
    const { options, URI } = this.props;
    const { toolbar } = options;
    return URI ? (
      <div className="PDFViewer">
        {toolbar && <ToolBar URI={URI} options={options} />}
        <Viewer {...this.props} />
      </div>
    ) : null
  }
}

export default PDFViewer;
