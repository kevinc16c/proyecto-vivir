import 'isomorphic-fetch';
import { config } from '../../config'

export const api = {
    user: {
        async create(data) {
            const response = await fetch(config.URL_PANEL + '/usuarios', {
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
        async getAll(query = '') {
            const response = await fetch(config.URL_PANEL + `/usuarios?${query}`, {
                method: 'GET',
                headers: { 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}` },
            });
            const data = await response.json();
            return data;
        },
        async get(id) {
            const response = await fetch(config.URL_PANEL + `/usuarios/${id}`, {
                method: 'GET',
                headers: { 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}` },
            });
            const data = await response.json();
            return data;
        },
        async update(data) {
            const response = await fetch(config.URL_PANEL + '/usuarios', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },
        async baja(id) {
            const response = await fetch(config.URL_PANEL + '/usuarios/baja/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        },
        async alta(id) {
            const response = await fetch(config.URL_PANEL + '/usuarios/alta/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        },
        async getAllFranquicias() {
            const response = await fetch(config.URL_PANEL + `/usuarios/franquicias`, {
                method: 'GET',
                headers: { 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}` },
            });
            const responseData = await response.json();
            return responseData;
        },
        async getAllRoles() {
            const response = await fetch(config.URL_PANEL + '/usuarios/roles', {
                method: 'GET',
                headers: { 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}` },
            });
            const data = await response.json();
            return data;
        },
        async changePassword(data) {
            const response = await fetch(config.URL_PANEL + '/propietarios/cambiarClave', {
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
        async blanquearClave(id, data) {
            const response = await fetch(config.URL_PANEL + '/blanqueo/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        }
    },
};
