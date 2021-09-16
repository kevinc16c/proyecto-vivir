import 'isomorphic-fetch';
import { config } from '../../config';

export const api = {
    insumos: {
        async create(data) {
            const response = await fetch(config.URL_PANEL + '/insumos', {
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
            const response = await fetch(config.URL_PANEL + `/insumos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
                // body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },
        async habilitar(id) {
            const response = await fetch(config.URL_PANEL + `/insumos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
                // body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        },
        async delete(id){
            const response = await fetch(config.URL_PANEL + '/insumos/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
                },
			});
            const responseData = await response.json();
            return responseData;
        },
        async getAllLista(params = '') {
            const response = await fetch(config.URL_PANEL + '/niveles_insumos/lista?' + params, {
                method: 'GET',
                headers: { 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}` },
            });
            const data = await response.json();
            return data;
        },
        async getAll(id, params = '') {
            const response = await fetch(config.URL_PANEL + `/insumos/lugar/${id}?${params}`, {
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
            const response = await fetch(config.URL_PANEL + '/insumos', {
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
    suspender: {
        async get(id){
            const response = await fetch(config.URL_PANEL + '/insumos/suspender/'+ id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
                body: JSON.stringify(id)
    	});
            const responseData = await response.json();
            return responseData;
        },
    },
    habilitar: {
        async get(id){
            const response = await fetch(config.URL_PANEL + '/insumos/habilitar/'+ id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
                body: JSON.stringify(id)
    	});
            const responseData = await response.json();
            return responseData;
        },
    },
    lugares: {
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
};
