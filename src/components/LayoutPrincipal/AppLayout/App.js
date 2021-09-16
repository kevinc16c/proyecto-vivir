import React from 'react';
import classnames from 'classnames';
import { Layout } from 'antd';
import AppHeader from 'components/LayoutPrincipal/Header';
import AppFooter from 'components/LayoutPrincipal/Footer';
import AppContent from 'components/LayoutPrincipal/Content';

class AppLayout extends React.Component {
    
    render() {
        const { boxedLayout, fixedSidenav, fixedHeader } = this.props;
        return (
          <Layout id='app-layout' className={classnames('app-layout', {
            'boxed-layout'  : boxedLayout,
            'fixed-sidenav' : fixedSidenav,
            'fixed-header'  : fixedHeader,
          })}>
            {
              fixedHeader ?
                <Layout>
                  <AppHeader />
                  <Layout>
                    <AppContent />
                  </Layout>
                </Layout>
                :
                <Layout>
                  <AppHeader />
                  <AppContent />
                </Layout>
            }
          </Layout>
        )
    }
}

export default AppLayout;
