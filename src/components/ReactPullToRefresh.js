import React, { PropTypes, Component } from 'react';
import WebPullToRefresh from '../pull-to-refresh/wptr.1.1';

export default class ReactPullToRefresh extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh() {
    return new Promise((resolve, reject) => {
      this.props.onRefresh(resolve, reject);
    });
  }

  init() {
    if (!this.state.initialized) {
      WebPullToRefresh().init({
        contentEl: this.refs.refresh,
        ptrEl: this.refs.ptr,
        bodyEl: this.refs.body,
        distanceToRefresh: this.props.distanceToRefresh || undefined,
        loadingFunction: this.handleRefresh,
        resistance: this.props.resistance || undefined,
        hammerOptions: this.props.hammerOptions || undefined
      });
      this.setState({
        initialized: true
      });
    }
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.init();
    }
  }

  componentDidUpdate() {
    if (!this.props.disabled) {
      this.init();
    }
  }

  render() {
    if (this.props.disabled) {
      return (
        <div {...this.props}>
          {this.props.children}
        </div>
      );
    }
    let icon = this.props.icon || <span className="genericon genericon-next"></span>;
    let loading = this.props.loading || (
      <div className="loading">
        <span className="loading-ptr-1"></span>
        <span className="loading-ptr-2"></span>
        <span className="loading-ptr-3"></span>
      </div>
    );
    return (
      <div ref="body" {...this.props}>
        <div ref="ptr" className="ptr-element">
          {icon}
          {loading}
        </div>
        <div ref="refresh" className="refresh-view">
          {this.props.children}
        </div>
      </div>
    );
  }
}

ReactPullToRefresh.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  icon: PropTypes.element,
  loading: PropTypes.element,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  distanceToRefresh: PropTypes.number,
  resistance: PropTypes.number,
  hammerOptions: PropTypes.object
};
