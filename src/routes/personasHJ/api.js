import 'isomorphic-fetch';
import {config} from '../../config';

export const api = {
	propietarios:{
		async create(data) {
            const response = await fetch(config.URL_ADMIN + '/propietarios', {
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
        async enviarPass(id, data) {
            const response = await fetch(config.URL_ADMIN + `/propietarios/emailclave/${id}`, {
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
            const response = await fetch(config.URL_ADMIN + `/propietarios/baja/${id}`, {
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
            const response = await fetch(config.URL_ADMIN + `/propietarios/habilitar/${id}`, {
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
			const response = await fetch(config.URL_ADMIN + '/niveles_propietarios/lista?'+params, {
				method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const data = await response.json();
			return data;
        },
        
		async getAll(params = ''){
			const response = await fetch(config.URL_ADMIN + '/propietarios?'+params, {
				method: 'GET',
                headers: {'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
            },
			});
			const data = await response.json();
			return data;
		},
		async update(data){
            const response = await fetch(config.URL_ADMIN + '/propietarios', {
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
            const response = await fetch(config.URL_ADMIN + '/propietarios/clave', {
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
            const response = await fetch(config.URL_ADMIN + '/propietarios/cambiarClave', {
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
		