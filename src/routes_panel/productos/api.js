import 'isomorphic-fetch';
import { config } from '../../config';

export const api = {
    productos: {
        async getAll(id, params='') {
            const response = await fetch(config.URL_PANEL + '/productos/lugares/' + id + '?' + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async get(id, params='') {
            const response = await fetch(config.URL_PANEL + '/productos/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async create(data) {
            const response = await fetch(config.URL_PANEL + '/productos', {
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
        async update(data){
            const response = await fetch(config.URL_PANEL + '/productos', {
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
        async setInsumos(id, data){
            const response = await fetch(config.URL_PANEL + '/productos/' + id + '/insumos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
                body: JSON.stringify({insumos: data})
    	});
            const responseData = await response.json();
            return responseData;
        },
        async baja(id){
            const response = await fetch(config.URL_PANEL + `/productos/baja/${id}`, {
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
        async habilitar(id){
            const response = await fetch(config.URL_PANEL + `/productos/habilitar/${id}`, {
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
    },
    stockAgotado: {
        async get(id){
            const response = await fetch(config.URL_PANEL + '/productos/agotado/'+ id, {
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
    enStock: {
        async get(id){
            const response = await fetch(config.URL_PANEL + '/productos/enstock/'+ id, {
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
    categorias: {
        async get(id) {
            const response = await fetch(config.URL_PANEL + '/categorias/rubro/' + id, {
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
    alicuota: {
        async getAll() {
            const response = await fetch(config.URL_PANEL + '/alicuotas/lista', {
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
    insumos: {
        async getAll(id, params='') {
            const response = await fetch(config.URL_PANEL + `/productos/${id}/insumos?${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async getAllAgregar(id, params = '') {
            const response = await fetch(config.URL_PANEL + '/insumos/lugar/' + id + '?' + params, {
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
            const response = await fetch(config.URL_PANEL + '/insumos/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
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
        async update(data){
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
        async setInsumos(data, id){
            const response = await fetch(config.URL_PANEL + '/productos/' + id + '/insumos', {
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
        async baja(id){
            const response = await fetch(config.URL_PANEL + `/insumos/baja/${id}`, {
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
        async habilitar(id){
            const response = await fetch(config.URL_PANEL + `/insumos/habilitar/${id}`, {
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
    },
    imagenes:{
        async create(data) {
            const response = await fetch(config.URL_PANEL + '/productos/imagenes', {
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
		async getAll(id){
			const response = await fetch(config.URL_PANEL + `/productos/${id}/imagenes`, {
				method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
			});
			const data = await response.json();
			return data;
        },
        async get(id){
                const response = await fetch(config.URL_PANEL + `/productos/imagenes/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                    },
                });
                const data = await response.json();
                return data;
        },
        async delete(id){
            const response = await fetch(config.URL_PANEL + '/productos/imagenes/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        },
    },
};
