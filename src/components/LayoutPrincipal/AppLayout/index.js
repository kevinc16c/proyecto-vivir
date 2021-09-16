import React from 'react';
import { connect } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/es_ES';
// import APPCONFIG from 'constants/appConfig';

import App from './App'
// import ContentOnly from './ContentOnly'
// import HeaderContentFooter from './HeaderContentFooter'

class AppLayout extends React.Component {

  updateLayout(layout, boxedLayout, fixedSidenav, fixedHeader) {
    return (
      <ConfigProvider locale={zhCN}>
        <App boxedLayout={boxedLayout} fixedSidenav={fixedSidenav} fixedHeader={fixedHeader} />
      </ConfigProvider>
    )
  }

  render() {
    const { layout, boxedLayout, fixedSidenav, fixedHeader } = this.props;

    return (
      <div id="app-layout-container">
        { this.updateLayout(layout, boxedLayout, fixedSidenav, fixedHeader)}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  layout: state.settings.layout,
  boxedLayout: state.settings.boxedLayout,
});

export default connect(
  mapStateToProps
)(AppLayout);
