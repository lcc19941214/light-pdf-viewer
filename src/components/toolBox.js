import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MIN_SCALE, MAX_SCALE, INITIAL_SCALE } from '../utils/utils';

export default class ToolBox extends Component {
  static propTypes = {
    file: PropTypes.string.isRequired,
    scale: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handleZoomIn: PropTypes.func.isRequired,
    handleZoomOut: PropTypes.func.isRequired,
    handleZoomToggle: PropTypes.func.isRequired,
    handleDownload: PropTypes.func.isRequired
  };

  render() {
    const { pageCount, currentPage, scale, file } = this.props;
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
              className={classnames('action-btn', {
                disabled: scale <= MIN_SCALE
              })}
              onClick={this.props.handleZoomOut}>
              <div className="action-btn__icon zoom-out" />
            </div>
            <div className="action-btn" onClick={this.props.handleZoomToggle}>
              <div
                className={classnames('action-btn__icon', {
                  'zoom-device__zoom-in': scale === INITIAL_SCALE,
                  'zoom-device__zoom-out': scale !== INITIAL_SCALE
                })}
              />
            </div>
            <div
              className={classnames('action-btn', {
                disabled: scale >= MAX_SCALE
              })}
              onClick={this.props.handleZoomIn}>
              <div className="action-btn__icon zoom-in" />
            </div>
          </div>
          <div className="action-group">
            <a
              className="action-btn"
              download
              href={file}
              onClick={this.props.handleDownload}>
              <div className="action-btn__icon download" href={file} download />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
