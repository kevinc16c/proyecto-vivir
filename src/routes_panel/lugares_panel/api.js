import 'isomorphic-fetch';
import {config} from '../../config';

export const api = {
	lugares:{
        async sendToken(data) {
            const response = await fetch(config.URL_PANEL + '/lugares/sesiones', {
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
        async pdf(id, mimeType) {
            const response = await fetch(config.URL_PANEL + `/lugares/qr/imprimir/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
				},
			});
			const buf = await response.arrayBuffer();
			const file = await new File([buf], id + '.pdf', { type: mimeType })
			return file;
		},
		async create(data) {
            const response = await fetch(config.URL_PANEL + '/lugares', {
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
        async abierto(id){
            const response = await fetch(config.URL_PANEL + `/lugares/abierto/${id}`, {
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
        async cerrado(id){
            const response = await fetch(config.URL_PANEL + `/lugares/cerrado/${id}`, {
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
        async baja(id){
            const response = await fetch(config.URL_PANEL + `/lugares/baja/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
    	});
            const responseData = await response.json();
            return responseData;
        },
        async habilitar(id){
            const response = await fetch(config.URL_PANEL + `/lugares/habilitar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
    	});
            const responseData = await response.json();
            return responseData;
        },

        async getAllLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/niveles_lugares/lista?'+params, {
				method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`},
			});
			const data = await response.json();
			return data;
        },
        async getLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/lugares/lista?' + params, {
				method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
			});
			const data = await response.json();
			return data;
        },
        async getLugar(id){
			const response = await fetch(config.URL_PANEL + '/lugares/propietarios/'+id, {
				method: 'GET',
                headers: {'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
            },
			});
			const data = await response.json();
			return data;
        },
        async getQR(id){
			const response = await fetch(config.URL_IMG + '/img/lugares/qr/'+id+'.png', {
				method: 'GET',
			});
            const data = await response.json();
			return data;
		},
		async getAll(params = ''){
			const response = await fetch(config.URL_PANEL + '/lugares/propietarios?'+params, {
				method: 'GET',
                headers: {'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
            },
			});
			const data = await response.json();
			return data;
		},
		async update(data){
            const response = await fetch(config.URL_PANEL + '/lugares', {
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

        async asignarPass(data){
            const response = await fetch(config.URL_PANEL + '/lugares/clave', {
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

        async cambiarPass(data){
            const response = await fetch(config.URL_PANEL + '/lugares/cambiarClave', {
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
    tipodoc:{
		async getAll(params = ''){
			const response = await fetch(config.URL_PANEL + '/documentos&'+params, {
				method: 'GET',
                headers: {'Content-Type': 'application/json',},
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
			});
			const data = await response.json();
			return data;
		},
    },
    paises:{
		async getLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/paises/lista', {
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
    provincias:{
		async getLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/provincias/lista', {
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
    condicioniva:{
		async getAll(params = ''){
			const response = await fetch(config.URL_PANEL + '/condicionesiva?'+params, {
				method: 'GET',
                headers: {
                    'Content-Type': 'application/json',},
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
			});
			const data = await response.json();
			return data;
        },
        async getAllLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/condicionesiva/lista?'+params, {
				method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`},
			});
			const data = await response.json();
			return data;
        },
    },
    propietarios:{
		async getLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/propietarios/lista?'+params, {
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
    localidades:{
		async getLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/localidades/lista?' + params, {
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
    rubros:{
		async getLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/rubros/lista?' + params, {
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
    subrubros:{
		async getLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/subrubros/lista?' + params, {
				method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
			});
			const data = await response.json();
			return data;
        },
        async getByRubro(id, params = ''){
			const response = await fetch(config.URL_PANEL + '/subrubros/rubro/'+id, {
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
    tipos_lugares:{
		async getLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/tiposlugares/lista', {
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
    convenios:{
		async getLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/convenios/lista', {
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
    tipo_delivery:{
		async getLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/tiposdelivery/lista', {
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
    rrss:{
        async create(data) {
            const response = await fetch(config.URL_PANEL + '/lugaresredes', {
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
		async getLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/redes/lista', {
				method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
			});
			const data = await response.json();
			return data;
        },
        async getAll(id){
			const response = await fetch(config.URL_PANEL + `/lugares/${id}/redes`, {
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
    dias:{
		async getLista(params = ''){
			const response = await fetch(config.URL_PANEL + '/dias/lista', {
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
    horarios:{
        async delete(id) {
            const response = await fetch(config.URL_PANEL + '/horarios/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
                },
            });
            const responseData = await response.json();
            return responseData;
        },
        async create(data) {
            const response = await fetch(config.URL_PANEL + '/horarios', {
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
		async get(id){
			const response = await fetch(config.URL_PANEL + '/horarios/'+id, {
				method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
                },
			});
			const data = await response.json();
			return data;
        },
        async update(data){
            const response = await fetch(config.URL_PANEL + '/horarios', {
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
        async getAll(id){
			const response = await fetch(config.URL_PANEL + `/lugares/${id}/horarios`, {
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
    imagenes:{
        async create(data) {
            const response = await fetch(config.URL_PANEL + '/imagenes', {
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
			const response = await fetch(config.URL_PANEL + `/lugares/${id}/imagenes`, {
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
            const response = await fetch(config.URL_PANEL + '/imagenes/'+id, {
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
		