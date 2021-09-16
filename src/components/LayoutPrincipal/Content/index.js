import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';
import { Layout } from 'antd';
const { Content } = Layout;

let AsyncDash = loadable({
  loader: () => import('routes_principal/dashboard/index'),
  loading: LoadingComponent,
})
// let AsyncContact= loadable({
//   loader: () => import('routes_principal/contacto'),
//   loading: LoadingComponent,
// })

class AppContent extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Content id='app-content'>
        <Route exact path={`${match.url}/inicio`} component={AsyncDash} />
      </Content>
    );
  }
}

export default withRouter(AppContent);