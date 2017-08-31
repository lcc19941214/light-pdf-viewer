import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import utils from '../lib/utils';
import {
  INITIAL_SCALE,
  MIN_SCALE,
  MAX_SCALE,
} from '../lib/constant';

export default class Toolbox extends Component {
  static propTypes = {
    URI: PropTypes.string.isRequired,
    scale: PropTypes.number.isRequired,
    toolbox: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    pageCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handleZoomIn: PropTypes.func.isRequired,
    handleZoomOut: PropTypes.func.isRequired,
    handleZoomToggle: PropTypes.func.isRequired,
    handleDownload: PropTypes.func.isRequired
  };

  toolboxNames = ['pager', 'zoomer', 'operation'];

  toolboxItems = (props) => {
    const { pageCount, currentPage, scale, URI } = props;
    return {
      pager: (
        <div className="toolbox__item page-group" key="toolbox-pager">
          <div className="label">页面</div>
          <div className="current">
            {currentPage}
          </div>
          <span className="divide-line">/</span>
          <div className="count">
            {pageCount}
          </div>
        </div>
      ),
      zoomer: (
        <div className="toolbox__item action-group" key="toolbox-zoomer">
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
      ),
      operation: (
        <div className="toolbox__item action-group" key="toolbox-operation">
          <a
            className="action-btn"
            download
            href={URI}
            onClick={this.props.handleDownload}>
            <div className="action-btn__icon download" href={URI} download />
          </a>
        </div>
      )
    }
  }

  render() {
    const { toolbox, pageCount } = this.props;
    const toolboxItems = this.toolboxItems(this.props);
    let content = [];
    if (typeof toolbox === 'boolean' && toolbox) {
      content = this.toolboxNames.map(tool => toolboxItems[tool]);
    } else if (utils.isObject(toolbox)) {
      const customToolNames = Object.keys(toolbox);
      this.toolboxNames.forEach(tool => {
        if (customToolNames.includes(tool) && toolbox[tool]) {
          content.push(toolboxItems[tool]);
        }
      });
    }
    return content.length && pageCount ? (
      <div className="toolbox-wrapper">
        <div className="toolbox">
          {content}
        </div>
      </div>
    ) : null;
  }
}
