import 'isomorphic-fetch';
import { config } from '../../../config';

export const api = {
    pedidos: {
        async getAll(id, idEstado, params='') {
            const response = await fetch(config.URL_PANEL + '/pedidos/lugar/' + id + '?estado=' + idEstado + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
    },
};
