import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ToolBar extends Component {

  render() {
    return (
      <div className="toolbar-wrapper">
        <div className="toolbar">
          <div className="action-group">
            <div className="action-btn">+</div>
            <div className="action-btn">-</div>
          </div>
        </div>
      </div>
    );
  }
}
