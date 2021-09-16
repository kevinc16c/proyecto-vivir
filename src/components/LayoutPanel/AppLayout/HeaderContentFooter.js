import React from 'react';
import classnames from 'classnames';
import { Layout } from 'antd';
import AppHeader from 'components/LayoutPanel/Header'
import AppContent from 'components/LayoutPanel/Content'
import AppFooter from 'components/LayoutPanel/Footer'

class AppLayout extends React.Component {

  render() {
    const { boxedLayout, fixedHeader } = this.props;

    return (
      <Layout id='app-layout' className={classnames('app-layout', {
        'boxed-layout'  : boxedLayout,
        'fixed-header'  : fixedHeader,
      })}>
        <AppHeader showLogo={true} />
        <AppContent />
        <AppFooter />
      </Layout>
    )
  }
}

export default AppLayout;
