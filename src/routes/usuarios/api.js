import 'isomorphic-fetch';
import { config } from 'config'

export const api = {
    user: {
        async create(data) {
            const response = await fetch(config.URL_ADMIN + '/usuarios', {
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
        async getAll(query = '') {
            const response = await fetch(config.URL_ADMIN + `/usuarios?${query}`, {
                method: 'GET',
                headers: { 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}` },
            });
            const data = await response.json();
            return data;
        },
        async get(id) {
            const response = await fetch(config.URL_ADMIN + `/usuarios/${id}`, {
                method: 'GET',
                headers: { 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}` },
            });
            const data = await response.json();
            return data;
        },
        async update(data) {
            const response = await fetch(config.URL_ADMIN + '/usuarios', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },
        async baja(id) {
            const response = await fetch(config.URL_ADMIN + '/usuarios/baja/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        },
        async alta(id) {
            const response = await fetch(config.URL_ADMIN + '/usuarios/alta/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        },
        async getAllFranquicias() {
            const response = await fetch(config.URL_ADMIN + `/usuarios/franquicias`, {
                method: 'GET',
                headers: { 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}` },
            });
            const responseData = await response.json();
            return responseData;
        },
        async getAllRoles() {
            const response = await fetch(config.URL_ADMIN + '/usuarios/roles', {
                method: 'GET',
                headers: { 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}` },
            });
            const data = await response.json();
            return data;
        },
        async changePassword(id, data) {
            const response = await fetch(config.URL_ADMIN + '/password/' + id, {
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
        async blanquearClave(id, data) {
            const response = await fetch(config.URL_ADMIN + '/blanqueo/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        }
    },
};
