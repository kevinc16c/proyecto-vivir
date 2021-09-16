import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';
import { Layout } from 'antd';
const { Content } = Layout;

let AsyncConfig = loadable({
  loader: () => import('routes_panel/config/'),
  loading: LoadingComponent,
})
let AsyncLugaresPanel = loadable({
  loader: () => import('routes_panel/lugares_panel'),
  loading: LoadingComponent,
})
let AsyncProductos= loadable({
  loader: () => import('routes_panel/productos'),
  loading: LoadingComponent,
})
let AsyncProductosEditar= loadable({
  loader: () => import('routes_panel/productos/Editar'),
  loading: LoadingComponent,
})
let AsyncSabores_variedades = loadable({
  loader: () => import('routes_panel/sabores_variedades'),
  loading: LoadingComponent,
})
let AsyncPromociones = loadable({
  loader: () => import('routes_panel/promociones'),
  loading: LoadingComponent,
})
let AsyncPedidos= loadable({
  loader: () => import('routes_panel/pedidos'),
  loading: LoadingComponent,
})
let AsyncPedidosDetalle= loadable({
  loader: () => import('routes_panel/pedidos/Detalle'),
  loading: LoadingComponent,
})
let AsyncCuentas= loadable({
  loader: () => import('routes_panel/cuentas'),
  loading: LoadingComponent,
})

class AppContent extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Content id='app-content'>
        <Route exact path={`${match.url}/config/:id`} component={AsyncConfig} />
        <Route exact path={`${match.url}/lugares/:id`} component={AsyncLugaresPanel} />
        <Route exact path={`${match.url}/productos`} component={AsyncProductos} />
        <Route exact path={`${match.url}/productos/editar/:id`} component={AsyncProductosEditar} />
        <Route exact path={`${match.url}/sabores_variedades`} component={AsyncSabores_variedades} />
        <Route exact path={`${match.url}/promociones`} component={AsyncPromociones} />
        <Route exact path={`${match.url}/pedidos`} component={AsyncPedidos} />
        <Route exact path={`${match.url}/pedidos/detalle/:id`} component={AsyncPedidosDetalle} />
        <Route exact path={`${match.url}/cuentas`} component={AsyncCuentas} />
      </Content>
    );
  }
}

export default withRouter(AppContent);