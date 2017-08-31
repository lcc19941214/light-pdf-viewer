import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PDFViewer from '../dist/js/light-pdf-viewer';

class App extends Component {
  state = {
    URI: '/public/pdf/example.pdf'
  }

  handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file && /^application\/pdf$/.test(file.type)) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState({ URI: reader.result });
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      e.preventDefault();
      alert('Please upload a pdf.');
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>light pdf viewer</h1>
          <span>by <a href="https://github.com/lcc19941214/light-pdf-viewer" target="_blank">Conan Lau</a></span>
        </header>
        <div className="upload-area">
          upload any pdf if you want&nbsp;&nbsp;
          <input type="file" accept="application/pdf" onChange={this.handleInputChange} />
        </div>
        <PDFViewer URI={this.state.URI} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
