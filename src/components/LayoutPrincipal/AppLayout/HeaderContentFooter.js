import React from 'react';
import classnames from 'classnames';
import { Layout } from 'antd';
import AppHeader from 'components/LayoutPrincipal/Header'
import AppContent from 'components/LayoutPrincipal/Content'
import AppFooter from 'components/LayoutPrincipal/Footer'

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
