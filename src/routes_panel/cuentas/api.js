import 'isomorphic-fetch';
import { config } from '../../config';

export const api = {
    cuentas: {
        async getAll(id, query = '') {
            const response = await fetch(config.URL_PANEL + `/lugares/cuentas/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async activar(idlugar, id) {
            const response = await fetch(config.URL_PANEL + `/cuentas/${idlugar}/habilitar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        },
        async desactivar(id) {
            const response = await fetch(config.URL_PANEL + `/cuentas/suspender/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        },
        async eliminar(id) {
            const response = await fetch(config.URL_PANEL + `/cuentas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        },
        async renovar(data) {
            const response = await fetch(`https://api.mercadopago.com/oauth/token`, {
      			  method: 'POST',
      			  headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                    },
      			  body: JSON.stringify(data)
      			});
            const responseData = await response.json();
            return responseData;
        },
    },
};
