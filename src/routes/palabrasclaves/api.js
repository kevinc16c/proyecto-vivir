import 'isomorphic-fetch';
import {config} from '../../config';

export const api = {
	palabras:{
		async create(data) {
            const response = await fetch(config.URL_ADMIN + '/palabras', {
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
            const response = await fetch(config.URL_ADMIN + '/palabras/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        },
        async baja(id){
            const response = await fetch(config.URL_ADMIN + `/palabras/baja/${id}`, {
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
            const response = await fetch(config.URL_ADMIN + `/palabras/habilitar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
    	});
            const responseData = await response.json();
            return responseData;
        },

        async getAllLista(params = ''){
			const response = await fetch(config.URL_ADMIN + '/niveles_palabras/lista?'+params, {
				method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const data = await response.json();
			return data;
        },
        
		async getAll(params = ''){
			const response = await fetch(config.URL_ADMIN + '/palabras?'+params, {
				method: 'GET',
                headers: {'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
            },
			});
			const data = await response.json();
			return data;
		},
		async update(data){
            const response = await fetch(config.URL_ADMIN + '/palabras', {
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

        async asignarPass(data){
            const response = await fetch(config.URL_ADMIN + '/palabras/clave', {
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

        async cambiarPass(data){
            const response = await fetch(config.URL_ADMIN + '/palabras/cambiarClave', {
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
    tipodoc:{
		async getAll(params = ''){
			const response = await fetch(config.URL_ADMIN + '/documentos&'+params, {
				method: 'GET',
                headers: {'Content-Type': 'application/json',},
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
			});
			const data = await response.json();
			return data;
		},
    },
    paises:{
		async getLista(params = ''){
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
    rubros:{
        async getAll(params = ''){
			const response = await fetch(config.URL_ADMIN + '/rubros/lista?', {
				method: 'GET',
                headers: {'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
            },
			});
			const data = await response.json();
			return data;
		},
    },
    provincias:{
		async getLista(params = ''){
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
    condicioniva:{
		async getAll(params = ''){
			const response = await fetch(config.URL_ADMIN + '/condicionesiva?'+params, {
				method: 'GET',
                headers: {
                    'Content-Type': 'application/json',},
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
			});
			const data = await response.json();
			return data;
        },
        async getAllLista(params = ''){
			const response = await fetch(config.URL_ADMIN + '/condicionesiva/lista?'+params, {
				method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const data = await response.json();
			return data;
        },
	},
};
		