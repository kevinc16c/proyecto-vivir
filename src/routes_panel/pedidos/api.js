import 'isomorphic-fetch';
import { config } from '../../config';

export const api = {
    pedidos: {
        async get(id, params='') {
            const response = await fetch(config.URL_PANEL + '/pedidos/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async getAll(id, idEstado, params='') {
            const response = await fetch(config.URL_PANEL + '/pedidos/lugar/' + id + '?estado=' + idEstado + "&" + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async estados() {
            const response = await fetch(config.URL_PANEL + '/estados/lista', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async estadosSegunAnterior(id) {
            const response = await fetch(config.URL_PANEL + '/estados/lista/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async cambiarEstado(data){
            const response = await fetch(config.URL_PANEL + '/pedidos', {
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
        async create(data) {
            const response = await fetch(config.URL_PANEL + '/pedidos', {
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
            const response = await fetch(config.URL_PANEL + '/pedidos', {
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
        async baja(id){
            const response = await fetch(config.URL_PANEL + `/pedidos/baja/${id}`, {
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
            const response = await fetch(config.URL_PANEL + `/pedidos/habilitar/${id}`, {
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
    tiposDelivery: {
        async getAll() {
            const response = await fetch(config.URL_PANEL + '/delivery/pedido', {
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
            const response = await fetch(config.URL_PANEL + '/pedidos/delivery', {
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
    stockAgotado: {
        async get(id){
            const response = await fetch(config.URL_PANEL + '/pedidos/agotado/'+ id, {
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
            const response = await fetch(config.URL_PANEL + '/pedidos/enstock/'+ id, {
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
            const response = await fetch(config.URL_PANEL + `/pedidos/${id}/insumos?${params}`, {
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
            const response = await fetch(config.URL_PANEL + '/pedidos/' + id + '/insumos', {
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
            const response = await fetch(config.URL_PANEL + '/pedidos/imagenes', {
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
			const response = await fetch(config.URL_PANEL + `/pedidos/${id}/imagenes`, {
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
                const response = await fetch(config.URL_PANEL + `/pedidos/imagenes/${id}`, {
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
            const response = await fetch(config.URL_PANEL + '/pedidos/imagenes/'+id, {
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
