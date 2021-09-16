import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';
import { Layout } from 'antd';
const { Content } = Layout;

let AsyncDashboard = loadable({
  loader: () => import('routes/dashboard/'),
  loading: LoadingComponent
})

let AsyncConfig = loadable({
  loader: () => import('routes/config/'),
  loading: LoadingComponent,
})

let AsyncUsers = loadable({
  loader: () => import('routes/usuarios/'),
  loading: LoadingComponent,
})
let AsyncEditarUsuario = loadable({
  loader: () => import('routes/usuarios/Editar'),
  loading: LoadingComponent,
})
let AsyncOperadores = loadable({
  loader: () => import('routes/operadores'),
  loading: LoadingComponent,
})
let AsyncPropietarios = loadable({
  loader: () => import('routes/personasHJ'),
  loading: LoadingComponent,
})
let AsyncPaises = loadable({
  loader: () => import('routes/paises'),
  loading: LoadingComponent,
})
let AsyncProvincias = loadable({
  loader: () => import('routes/provincias'),
  loading: LoadingComponent,
})
let AsyncLocalidades = loadable({
  loader: () => import('routes/localidades'),
  loading: LoadingComponent,
})
let AsyncLugares = loadable({
  loader: () => import('routes/lugares'),
  loading: LoadingComponent,
})
let AsyncRubros = loadable({
  loader: () => import('routes/rubros'),
  loading: LoadingComponent,
})
let AsyncSubrubros = loadable({
  loader: () => import('routes/subrubros'),
  loading: LoadingComponent,
})
let AsyncPalabrasClaves = loadable({
  loader: () => import('routes/palabrasclaves'),
  loading: LoadingComponent,
})
let AsyncPromociones = loadable({
  loader: () => import('routes/promociones'),
  loading: LoadingComponent,
})
let AsyncLugaresNuevo = loadable({
  loader: () => import('routes/lugares/Nuevo'),
  loading: LoadingComponent,
})
let AsyncLugaresEditar = loadable({
  loader: () => import('routes/lugares/Edit'),
  loading: LoadingComponent,
})
let AsyncProductoscategorias = loadable({
  loader: () => import('routes/productoscategorias'),
  loading: LoadingComponent,
})
let AsyncLugaresPanel = loadable({
  loader: () => import('routes/lugares_panel'),
  loading: LoadingComponent,
})
let AsyncNotificaciones = loadable({
  loader: () => import('routes/notificaciones'),
  loading: LoadingComponent,
})

let AsyncFarmacias = loadable({
  loader: () => import('routes/farmacias_deturno'),
  loading: LoadingComponent,
})
let AsyncRegistroCovid = loadable({
  loader: () => import('routes/registro_covid'),
  loading: LoadingComponent,
})

let AsyncEventos = loadable({
  loader: () => import('routes/eventos'),
  loading: LoadingComponent,
})

let AsyncAsyncEventosNuevo = loadable({
  loader: () => import('routes/eventos/Nuevo'),
  loading: LoadingComponent,
})
let AsyncAsyncEventosEditar = loadable({
  loader: () => import('routes/eventos/Edit'),
  loading: LoadingComponent,
})
let AsyncLiquidaciones = loadable({
  loader: () => import('routes/liquidaciones/listado'),
  loading: LoadingComponent,
})
let AsyncLiquidar = loadable({
  loader: () => import('routes/liquidaciones'),
  loading: LoadingComponent,
})
let AsyncLiquidacionesDetalle = loadable({
  loader: () => import('routes/liquidaciones/detalle'),
  loading: LoadingComponent,
})
let AsyncPedidos = loadable({
  loader: () => import('routes/pedidos'),
  loading: LoadingComponent,
})
let AsyncPedidosDetalle = loadable({
  loader: () => import('routes/pedidos/Detalle'),
  loading: LoadingComponent,
})


class AppContent extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Content id='app-content'>
        <Route exact path={`${match.url}/inicio`} component={AsyncDashboard} />
        <Route exact path={`${match.url}/config/:id`} component={AsyncConfig} />
        <Route exact path={`${match.url}/usuarios`} component={AsyncUsers} />
        <Route exact path={`${match.url}/usuarios/:id/editar`} component={AsyncEditarUsuario} />
        <Route exact path={`${match.url}/operadores`} component={AsyncOperadores} />
        <Route exact path={`${match.url}/propietarios`} component={AsyncPropietarios} />
        <Route exact path={`${match.url}/paises`} component={AsyncPaises} />
        <Route exact path={`${match.url}/provincias`} component={AsyncProvincias} />
        <Route exact path={`${match.url}/localidades`} component={AsyncLocalidades} />
        <Route exact path={`${match.url}/lugares`} component={AsyncLugares} />
        <Route exact path={`${match.url}/promociones`} component={AsyncPromociones} />
        <Route exact path={`${match.url}/rubros`} component={AsyncRubros} />
        <Route exact path={`${match.url}/subrubros`} component={AsyncSubrubros} />
        <Route exact path={`${match.url}/palabrasclaves`} component={AsyncPalabrasClaves} />
        <Route exact path={`${match.url}/lugares/nuevo`} component={AsyncLugaresNuevo} />
        <Route exact path={`${match.url}/lugares/editar/:id`} component={AsyncLugaresEditar} />
        <Route exact path={`${match.url}/productoscategorias`} component={AsyncProductoscategorias} />
        <Route exact path={`${match.url}/lugares_panel`} component={AsyncLugaresPanel} />
        <Route exact path={`${match.url}/notificaciones`} component={AsyncNotificaciones} />
        <Route exact path={`${match.url}/farmacias`} component={AsyncFarmacias} />
        <Route exact path={`${match.url}/registro`} component={AsyncRegistroCovid} />
        <Route exact path={`${match.url}/eventos`} component={AsyncEventos} />
        <Route exact path={`${match.url}/eventos/nuevo`} component={AsyncAsyncEventosNuevo} />
        <Route exact path={`${match.url}/eventos/editar/:id`} component={AsyncAsyncEventosEditar} />
        <Route exact path={`${match.url}/liquidar`} component={AsyncLiquidar} />
        <Route exact path={`${match.url}/liquidaciones`} component={AsyncLiquidaciones} />
        <Route exact path={`${match.url}/liquidaciones/:id`} component={AsyncLiquidacionesDetalle} />
        <Route exact path={`${match.url}/pedidos`} component={AsyncPedidos} />
        <Route exact path={`${match.url}/pedidos/detalle/:id`} component={AsyncPedidosDetalle} />
      </Content>
    );
    
  }

}

export default withRouter(AppContent);