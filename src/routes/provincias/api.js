import 'isomorphic-fetch';
import {config} from '../../config';

export const api = {
	provincias:{
		async create(data) {
            const response = await fetch(config.URL_ADMIN + '/provincias', {
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
            const response = await fetch(config.URL_ADMIN + `/provincias/baja/${id}`, {
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
            const response = await fetch(config.URL_ADMIN + `/provincias/habilitar/${id}`, {
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
			const response = await fetch(config.URL_ADMIN + '/niveles_provincias/lista?'+params, {
				method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const data = await response.json();
			return data;
        },
        
		async getAll(params = ''){
			const response = await fetch(config.URL_ADMIN + '/provincias?'+params, {
				method: 'GET',
                headers: {'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
            },
			});
			const data = await response.json();
			return data;
		},
		async update(data){
            const response = await fetch(config.URL_ADMIN + '/provincias', {
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
            const response = await fetch(config.URL_ADMIN + '/provincias/clave', {
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
            const response = await fetch(config.URL_ADMIN + '/provincias/cambiarClave', {
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
    localidades:{
		async getAll(params = ''){
			const response = await fetch(config.URL_ADMIN + '/localidades?'+params, {
				method: 'GET',
                headers: {'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const data = await response.json();
			return data;
        },
        async get(id){
			const response = await fetch(config.URL_ADMIN + '/localidades/'+id, {
				method: 'GET',
                headers: {'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
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
		