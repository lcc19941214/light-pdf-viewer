import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MIN_SCALE, MAX_SCALE } from '../utils/utils';

export default class ToolBox extends Component {
  static propTypes = {
    scale: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handleZoomIn: PropTypes.func.isRequired,
    handleZoomOut: PropTypes.func.isRequired,
    handleZoomToggle: PropTypes.func.isRequired
  };

  render() {
    const { pageCount, currentPage, scale } = this.props;
    return (
      <div className="tooltip-wrapper">
        <div className="tooltip">
          <div className="page-group">
            <div className="label">页面</div>
            <div className="current">
              {currentPage}
            </div>
            <span className="divide-line">/</span>
            <div className="count">
              {pageCount}
            </div>
          </div>
          <div className="action-group">
            <div
              className={classnames('action-btn', 'zoom-out', {
                disabled: scale <= MIN_SCALE
              })}
              onClick={this.props.handleZoomOut}>
              -
            </div>
            <div
              className="action-btn zoom-device-width"
              onClick={this.props.handleZoomToggle}>
              ?
            </div>
            <div
              className={classnames('action-btn', 'zoom-in', {
                disabled: scale >= MAX_SCALE
              })}
              onClick={this.props.handleZoomIn}>
              +
            </div>
          </div>
        </div>
      </div>
    );
  }
}
