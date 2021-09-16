import 'isomorphic-fetch';
import { config } from '../../config';

export const api = {
    pedidos: {
        async get(id, ) {
            const response = await fetch(config.URL_ADMIN + '/pedidos/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async getAll(params='') {
            const response = await fetch(config.URL_ADMIN + '/pedidos/delivery/1?' + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async estados() {
            const response = await fetch(config.URL_ADMIN + '/estados/lista', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async estadosSegunAnterior(id) {
            const response = await fetch(config.URL_ADMIN + '/estados/lista/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async cambiarEstado(data){
            const response = await fetch(config.URL_ADMIN + '/pedidos', {
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
        async create(data) {
            const response = await fetch(config.URL_ADMIN + '/pedidos', {
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
        async update(data){
            const response = await fetch(config.URL_ADMIN + '/pedidos', {
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
        async baja(id){
            const response = await fetch(config.URL_ADMIN + `/pedidos/baja/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
    	});
            const responseData = await response.json();
            return responseData;
        },
        async habilitar(id){
            const response = await fetch(config.URL_ADMIN + `/pedidos/habilitar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
    	});
            const responseData = await response.json();
            return responseData;
        },
    },
    token:{
        async enviar(data) {
            const response = await fetch(config.URL_ADMIN + '/sesiones', {
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
        async baja(data) {
                const response = await fetch(config.URL_ADMIN + '/sesiones/baja', {
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
    },
    stockAgotado: {
        async get(id){
            const response = await fetch(config.URL_ADMIN + '/pedidos/agotado/'+ id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(id)
    	});
            const responseData = await response.json();
            return responseData;
        },
    },
    enStock: {
        async get(id){
            const response = await fetch(config.URL_ADMIN + '/pedidos/enstock/'+ id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(id)
    	});
            const responseData = await response.json();
            return responseData;
        },
    },
    categorias: {
        async get(id) {
            const response = await fetch(config.URL_ADMIN + '/categorias/rubro/' + id, {
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
    alicuota: {
        async getAll() {
            const response = await fetch(config.URL_ADMIN + '/alicuotas/lista', {
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
    lugares: {
        async get(id) {
            const response = await fetch(config.URL_ADMIN + '/lugares/propietarios/' + id, {
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
    insumos: {
        async getAll(id, params='') {
            const response = await fetch(config.URL_ADMIN + `/pedidos/${id}/insumos?${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async getAllAgregar(id, params = '') {
            const response = await fetch(config.URL_ADMIN + '/insumos/lugar/' + id + '?' + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async get(id) {
            const response = await fetch(config.URL_ADMIN + '/insumos/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            return data;
        },
        async create(data) {
            const response = await fetch(config.URL_ADMIN + '/insumos', {
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
        async update(data){
            const response = await fetch(config.URL_ADMIN + '/insumos', {
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
        async setInsumos(data, id){
            const response = await fetch(config.URL_ADMIN + '/pedidos/' + id + '/insumos', {
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
        async baja(id){
            const response = await fetch(config.URL_ADMIN + `/insumos/baja/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
    	});
            const responseData = await response.json();
            return responseData;
        },
        async habilitar(id){
            const response = await fetch(config.URL_ADMIN + `/insumos/habilitar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
    	});
            const responseData = await response.json();
            return responseData;
        },
    },
    imagenes:{
        async create(data) {
            const response = await fetch(config.URL_ADMIN + '/pedidos/imagenes', {
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
		async getAll(id){
			const response = await fetch(config.URL_ADMIN + `/pedidos/${id}/imagenes`, {
				method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
			});
			const data = await response.json();
			return data;
        },
        async get(id){
                const response = await fetch(config.URL_ADMIN + `/pedidos/imagenes/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                    },
                });
                const data = await response.json();
                return data;
        },
        async delete(id){
            const response = await fetch(config.URL_ADMIN + '/pedidos/imagenes/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        },
    },
};
