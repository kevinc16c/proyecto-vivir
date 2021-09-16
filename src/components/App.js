import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';

// 3rd
import 'styles/antd.less';
import 'styles/bootstrap/bootstrap.scss'
// custom
import "styles/layout.scss"
import "styles/theme.scss"
import "styles/ui.scss"
import "styles/vendors.scss"


let AsyncAppLayout = loadable({
  loader: () => import('components/Layout/AppLayout/'),
  loading: LoadingComponent
})
let AsyncAccount = loadable({
  loader: () => import('routes/login/'),
  loading: LoadingComponent
})

let AsyncAccountPanel = loadable({
  loader: () => import('routes_panel/login/'),
  loading: LoadingComponent
})

let AsyncAppLayoutPanel = loadable({
  loader: () => import('components/LayoutPanel/AppLayout/'),
  loading: LoadingComponent
})

let AsyncInicio = loadable({
  loader: () => import('routes_principal/login/'),
  loading: LoadingComponent
})

let AsyncAppLayoutBasesYCondiciones = loadable({
  loader: () => import('./basescondiciones/index'),
  loading: LoadingComponent
})

let AsyncAppLayoutPoliticas = loadable({
  loader: () => import('./politicas/index'),
  loading: LoadingComponent
})

let AsyncAppContact = loadable({
  loader: () => import('routes_principal/contacto/index'),
  loading: LoadingComponent
})

class App extends React.Component {
  render() {
    const { match, location } = this.props;
    const isRoot = location.pathname === '/admin' ? true : false;
    const isRoot1 = location.pathname === '/' ? true : false;
    const isRoot2 = location.pathname === '/panel' ? true : false;
    // const isRoot3 = location.pathname === '/MercadoPago' ? true : false;
    if (isRoot) {
      return ( <Redirect to={'/login'}/> );
    }
    if (isRoot1) {
      return ( <Redirect to={'/inicio'}/> );
    }
    if (isRoot2) {
      return ( <Redirect to={'/login_panel'}/> );
    }

    return (
      <div id="app">
        <Route path={`${match.url}inicio`} component={AsyncInicio} />
        <Route path={`${match.url}login`} component={AsyncAccount} />
        <Route path={`${match.url}admin`} component={AsyncAppLayout} />
        <Route path={`${match.url}login_panel`} component={AsyncAccountPanel} />
        <Route path={`${match.url}panel`} component={AsyncAppLayoutPanel} />
        <Route path={`${match.url}terminos-y-condiciones`} component={AsyncAppLayoutBasesYCondiciones} />
        <Route path={`${match.url}politicas`} component={AsyncAppLayoutPoliticas} />
        <Route path={`${match.url}contact`} component={AsyncAppContact} />
      </div>
    )
  }
}


export default App;
