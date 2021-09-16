import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop';
import App from './App';
import { api } from '../api_panel'
import { message } from 'antd';
import { config } from '../config';

export default class Root extends Component {
  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    try {
      if (window.location.search) {
        message.info("Procesando. Por favor espere.")
        var serch = window.location.search
        var citrus = serch

        var valor = String(citrus).indexOf('&')

        if (valor) {
          citrus = serch.slice(6, valor)
        }

        const response = await api.MP.acceso({
          client_id: config.APP_ID_MP,
          client_secret: config.CLIENT_SECRET_MP,
          grant_type: 'authorization_code',
          code: citrus,
          redirect_uri: 'https://www.vivircarlospaz.com',
        })
        if (response.user_id) {
          const responseCuentaPagos = await api.cuentas_pago.alta({
            idlugar: parseInt(sessionStorage.getItem('lugar_id')),
            userid: `${response.user_id}`,
            publickey: response.public_key,
            accesstoken: response.access_token,
            refreshtoken: response.refresh_token,
            randomid: sessionStorage.getItem('CUSTOMIZED_ID')
          })
          if(responseCuentaPagos.status === "success"){
            window.open("https://www.vivircarlospaz.com/#/panel/cuentas","_self")
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ScrollToTop>
            <Route path="/" component={App} />
          </ScrollToTop>
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
