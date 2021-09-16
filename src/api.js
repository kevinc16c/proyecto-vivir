import 'isomorphic-fetch';
import {config} from './config'

export const api = {
    auth:{
        async login(data) {
            const response = await fetch(config.URL_ADMIN + '/login', {
      			  method: 'POST',
      			  headers: {
      			    'Content-Type': 'application/json'
      			  },
      			  body: JSON.stringify(data)
      			});
            const responseData = await response.json();
            return responseData;
        },
        async getAuthenticatedUser() {
            const response = await fetch(config.URL_ADMIN + '/autenticacion/operador', {
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
    user:{
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
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			      });
            const data = await response.json();
            return data;
        },
        async get(id) {
            const response = await fetch(config.URL_ADMIN + `/usuarios/${id}`, {
                method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			      });
            const data = await response.json();
            return data;
        },
        async update(data){
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
        async baja(id){
            const response = await fetch(config.URL_ADMIN + '/usuarios/baja/'+id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`,
                },
			      });
            const responseData = await response.json();
            return responseData;
        },
        async alta(id){
            const response = await fetch(config.URL_ADMIN + '/usuarios/alta/'+id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`,
                },
			      });
            const responseData = await response.json();
            return responseData;
        },
        async getAllFranquicias(){
            const response = await fetch(config.URL_ADMIN + `/usuarios/franquicias`, {
                method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			      });
            const responseData = await response.json();
            return responseData;
        },
        async getAllRoles() {
            const response = await fetch(config.URL_ADMIN + '/usuarios/roles', {
                method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			      });
            const data = await response.json();
            return data;
        },
        async getAllSistemas() {
            const response = await fetch(config.URL_ADMIN + '/usuarios/sistemas', {
                method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			      });
            const data = await response.json();
            return data;
        },
        async changePassword(id, data){
            const response = await fetch(config.URL_ADMIN + '/password/'+id, {
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
        async blanquearClave(id, data){
            const response = await fetch(config.URL_ADMIN + '/blanqueo/'+id, {
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
    afip:{
        async consultarCuit(cuit = ''){
            const response = await fetch(config.URL_ADMIN + `/afip/cuit/${cuit}`, {
                method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			      });
            const data = await response.json();
            return data;
        },
    },
    google_api:{
        async autocomplete(text = ''){
            const response = await fetch(`${config.URL_SOCKET_API}/google/autocomplete?q=${text}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
			});
            const data = await response.json();
            return data;
        },
        async getByPlaceID(placeid = ''){
            const response = await fetch(`${config.URL_SOCKET_API}/google/place/details?placeid=${placeid}`, {
                method: 'GET',
			});
            const data = await response.json();
            return data;
        },
    },
    nominatim: {
        async search(q) {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&addressdetails=1&polygon_geojson=1&country=Argentina`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            return data;
        },
    },
    graphhopper: {
        async optimize(data) {
            const response = await fetch('https://graphhopper.com/api/1/vrp/optimize?key=370d5360-c71b-4fba-a3fe-04ff2f3c8e07', {
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(data)
			});
            const responseData = await response.json();
            return responseData;
        },
        async getSolution(job_id) {
            const response = await fetch(`https://graphhopper.com/api/1/vrp/solution/${job_id}?key=370d5360-c71b-4fba-a3fe-04ff2f3c8e07`, {
                method: 'GET',
			});
            const data = await response.json();
            return data;
        }

    },
    autorizaciones:{
			async getAll(query = '') {
				const response = await fetch(config.URL_ADMIN + '/autorizaciones/alertas?'+ query, {
					method: 'GET',
					headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
				});
				const data = await response.json();
				return data;
			},
      async aprobar(id){
				const response = await fetch(config.URL_ADMIN + '/autorizaciones/aprobar/'+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`,
					},
				});
				const responseData = await response.json();
				return responseData;
			},
			async rechazar(id){
				const response = await fetch(config.URL_ADMIN + '/autorizaciones/rechazar/'+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`,
					},
				});
				const responseData = await response.json();
				return responseData;
			},
        },
        pedidos: {
            async pendientesLiquidacion(id, query='') {
                const response = await fetch(config.URL_ADMIN + `/pedidos/liquidar/${id}?${query}`, {
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
};
