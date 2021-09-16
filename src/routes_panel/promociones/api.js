import 'isomorphic-fetch';
import { config } from '../../config';

export const api = {
    promociones: {
        async create(data) {
            const response = await fetch(config.URL_PANEL + '/promociones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`

                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },
        async baja(id) {
            const response = await fetch(config.URL_PANEL + `/promociones/baja/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`

                },
            });
            const responseData = await response.json();
            return responseData;
        },
        async habilitar(id) {
            const response = await fetch(config.URL_PANEL + `/promociones/habilitar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`

                },
            });
            const responseData = await response.json();
            return responseData;
        },

        async getAllLista(params = '') {
            const response = await fetch(config.URL_PANEL + '/niveles_lugares/lista?' + params, {
                method: 'GET',
                headers: {
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async getAll(id, params = '') {
            const response = await fetch(config.URL_PANEL + '/promociones/lugar/' + id + '?' + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async update(data) {
            const response = await fetch(config.URL_PANEL + '/promociones', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`

                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },
        async cambiarImagen(data) {
            const response = await fetch(config.URL_PANEL + '/promociones/cambiarimagen', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`

                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },

        async asignarPass(data) {
            const response = await fetch(config.URL_PANEL + '/lugares/clave', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`

                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },

        async cambiarPass(data) {
            const response = await fetch(config.URL_PANEL + '/lugares/cambiarClave', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`

                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },
    },
    tipodoc: {
        async getAll(params = '') {
            const response = await fetch(config.URL_PANEL + '/documentos&' + params, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', },
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`

            });
            const data = await response.json();
            return data;
        },
    },
    paises: {
        async getLista(params = '') {
            const response = await fetch(config.URL_PANEL + '/paises/lista', {
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
    provincias: {
        async getLista(params = '') {
            const response = await fetch(config.URL_PANEL + '/provincias/lista', {
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
    condicioniva: {
        async getAll(params = '') {
            const response = await fetch(config.URL_PANEL + '/condicionesiva?' + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`

            });
            const data = await response.json();
            return data;
        },
        async getAllLista(params = '') {
            const response = await fetch(config.URL_PANEL + '/condicionesiva/lista?' + params, {
                method: 'GET',
                headers: {
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
    },
    lugares: {
        async getLista(params = '') {
            const response = await fetch(config.URL_PANEL + '/lugares/lista?' + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`

                },
            });
            const data = await response.json();
            return data;
        },
        async getAll(params = '') {
            const response = await fetch(config.URL_PANEL + '/lugares' + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`

                },
            });
            const data = await response.json();
            return data;
        },
        async get(id) {
            const response = await fetch(config.URL_PANEL + '/lugares/propietarios/' + id, {
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
    localidades: {
        async getLista(params = '') {
            const response = await fetch(config.URL_PANEL + '/localidades/lista?' + params, {
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
