import 'isomorphic-fetch';
import { config } from '../../config';

export const api = {
    farmacias: {
        async create(data) {
            const response = await fetch(config.URL_ADMIN + '/farmacias/turnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },
        async delete(id) {
            const response = await fetch(config.URL_ADMIN + '/rubros/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        },
        async baja(id) {
            const response = await fetch(config.URL_ADMIN + `/rubros/baja/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const responseData = await response.json();
            return responseData;
        },
        async habilitar(id) {
            const response = await fetch(config.URL_ADMIN + `/rubros/habilitar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const responseData = await response.json();
            return responseData;
        },

        async getAllLista(params = '') {
            const response = await fetch(config.URL_ADMIN + '/niveles_rubros/lista?' + params, {
                method: 'GET',
                headers: { 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}` },
            });
            const data = await response.json();
            return data;
        },

        async getAll(params = '') {
            const response = await fetch(config.URL_ADMIN + '/farmacias/turnos?' + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async update(data) {
            const response = await fetch(config.URL_ADMIN + '/rubros', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },

        async asignarPass(data) {
            const response = await fetch(config.URL_ADMIN + '/rubros/clave', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },

        async cambiarPass(data) {
            const response = await fetch(config.URL_ADMIN + '/rubros/cambiarClave', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },
    },
    lugares: {
        async GetConSubrubro(params = '') {
            const response = await fetch(config.URL_ADMIN + '/lugares/subrubros/45?' + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async getLista(params = '') {
            const response = await fetch(config.URL_ADMIN + '/lugares/lista?' + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            return data;
        },
    },
    tipodoc: {
        async getAll(params = '') {
            const response = await fetch(config.URL_ADMIN + '/documentos&' + params, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', },
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
            });
            const data = await response.json();
            return data;
        },
    },
    paises: {
        async getLista(params = '') {
            const response = await fetch(config.URL_ADMIN + '/paises/lista', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            return data;
        },
    },
    provincias: {
        async getLista(params = '') {
            const response = await fetch(config.URL_ADMIN + '/provincias/lista', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            return data;
        },
    },
    condicioniva: {
        async getAll(params = '') {
            const response = await fetch(config.URL_ADMIN + '/condicionesiva?' + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
            });
            const data = await response.json();
            return data;
        },
        async getAllLista(params = '') {
            const response = await fetch(config.URL_ADMIN + '/condicionesiva/lista?' + params, {
                method: 'GET',
                headers: { 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}` },
            });
            const data = await response.json();
            return data;
        },
    },
};
