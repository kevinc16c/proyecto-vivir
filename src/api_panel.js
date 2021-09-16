import 'isomorphic-fetch';
import {config} from './config'

export const api = {
    auth:{
        async login(data) {
            const response = await fetch(config.URL_PANEL + '/login', {
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
            const response = await fetch(config.URL_PANEL + '/autenticacion/propietario', {
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
    MP:{
        async login() {
            const response = await fetch(`https:auth.mercadopago.com.ar/authorization?client_id=${config.APP_ID_MP}&response_type=code&platform_id=mp&redirect_uri=${"https://www.mercadopago.com/"}`, {
                method: 'GET',
                mode:'no-cors'
            });
            //Para evitar warnings
            console.log(response)
            console.clear()
        },
        async acceso(data) {
            const response = await fetch(`https://api.mercadopago.com/oauth/token`, {
      			  method: 'POST',
      			  headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                    },
      			  body: JSON.stringify(data)
      			});
            const responseData = await response.json();
            return responseData;
        },
    },
    token:{
        async tokenBaja(data) {
                const response = await fetch(config.URL_PANEL + '/lugares/sesiones/baja', {
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
    },
    cuentas_pago:{
        async alta(data) {
            const response = await fetch(config.URL_PANEL + '/cuentas', {
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
    },
    user:{
        async create(data) {
            const response = await fetch(config.URL_PANEL + '/usuarios', {
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
        async getAll(query = '') {
            const response = await fetch(config.URL_PANEL + `/usuarios?${query}`, {
                method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`},
			      });
            const data = await response.json();
            return data;
        },
        async get(id) {
            const response = await fetch(config.URL_PANEL + `/usuarios/${id}`, {
                method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`},
			      });
            const data = await response.json();
            return data;
        },
        async update(data){
            const response = await fetch(config.URL_PANEL + '/usuarios', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
                },
                body: JSON.stringify(data)
			      });
            const responseData = await response.json();
            return responseData;
        },
        async baja(id){
            const response = await fetch(config.URL_PANEL + '/usuarios/baja/'+id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
                },
			      });
            const responseData = await response.json();
            return responseData;
        },
        async alta(id){
            const response = await fetch(config.URL_PANEL + '/usuarios/alta/'+id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
                },
			      });
            const responseData = await response.json();
            return responseData;
        },
        async getAllFranquicias(){
            const response = await fetch(config.URL_PANEL + `/usuarios/franquicias`, {
                method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`},
			      });
            const responseData = await response.json();
            return responseData;
        },
        async getAllRoles() {
            const response = await fetch(config.URL_PANEL + '/usuarios/roles', {
                method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`},
			      });
            const data = await response.json();
            return data;
        },
        async getAllSistemas() {
            const response = await fetch(config.URL_PANEL + '/usuarios/sistemas', {
                method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`},
			      });
            const data = await response.json();
            return data;
        },
        async changePassword(data) {
            const response = await fetch(config.URL_PANEL + '/propietarios/cambiarClave', {
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
        async blanquearClave(id, data){
            const response = await fetch(config.URL_PANEL + '/blanqueo/'+id, {
      			  method: 'PUT',
      			  headers: {
      			    'Content-Type': 'application/json',
                      'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`
      			  },
      			  body: JSON.stringify(data)
      			});
            const responseData = await response.json();
            return responseData;
        }
    },
    afip:{
        async consultarCuit(cuit = ''){
            const response = await fetch(config.URL_PANEL + `/afip/cuit/${cuit}`, {
                method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`},
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
				const response = await fetch(config.URL_PANEL + '/autorizaciones/alertas?'+ query, {
					method: 'GET',
					headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`},
				});
				const data = await response.json();
				return data;
			},
      async aprobar(id){
				const response = await fetch(config.URL_PANEL + '/autorizaciones/aprobar/'+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token_panel')}`,
					},
				});
				const responseData = await response.json();
				return responseData;
			},
			async rechazar(id){
				const response = await fetch(config.URL_PANEL + '/autorizaciones/rechazar/'+id, {
					method: 'PUT',
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
