
import 'isomorphic-fetch';
import { config } from '../../config'

export const api = {
	liquidacion: {
		async create(data) {
			const response = await fetch(config.URL_ADMIN + '/lugares/liquidaciones', {
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
		async getAll(params) {
			const response = await fetch(config.URL_ADMIN + '/lugares/liquidaciones?' + params, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const data = await response.json();
			return data;
		},
		async get(id) {
			const response = await fetch(config.URL_ADMIN + '/lugares/liquidaciones/' + id, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', 'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const data = await response.json();
			return data;
		},
		async getAllDetalle(id) {
			const response = await fetch(config.URL_ADMIN + '/cobros_clientes/recibo/' + id, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', },
			});
			const data = await response.json();
			return data;
		},
		async baja(data){
            const response = await fetch(config.URL_ADMIN + `/liquidaciones_fleteros/baja`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
    	});
            const responseData = await response.json();
            return responseData;
        },
	},
	liquidaciones_fleteros: {
		async imprimir(id) {
			const res = await fetch(config.URL_ADMIN + '/liquidaciones_fleteros/pdfLiquidacion/' + id, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const buf = await res.arrayBuffer();
			const file = await new File([buf], id + '.pdf', { type: 'application/pdf' })
			return file;
		},
		async getAll(query = '') {
			const response = await fetch(config.URL_ADMIN + '/liquidaciones_fleteros/liquidaciones&' + query, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', },
			});
			const data = await response.json();
			return data;
		},
		async getAllDetalle(id) {
			const response = await fetch(config.URL_ADMIN + '/cobros_clientes/recibo/' + id, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', },
			});
			const data = await response.json();
			return data;
		},
		async get(id) {
			const response = await fetch(config.URL_ADMIN + '/liquidaciones_fleteros/liquidacion/' + id, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', },
			});
			const data = await response.json();
			return data;
		},
	},
	cuentas: {
		async create(data) {
			const response = await fetch(config.URL_ADMIN + '/cobros_clientes/alta', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});
			const responseData = await response.json();
			return responseData;
		},
		async imprimir(id, data) {
			const res = await fetch(config.URL_ADMIN + '/ventas/' + id + '/imprimir?' + data, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/pdf',
				}
			});
			const buf = await res.arrayBuffer();
			const file = await new File([buf], id + '.pdf', { type: 'application/pdf' })
			return file;
		},
		async getAll(id) {
			const response = await fetch(config.URL_ADMIN + '/cuentas_fleteros/liquidar/' + id, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', },
			});
			const data = await response.json();
			return data;
		},
		async getAllDetalle(id) {
			const response = await fetch(config.URL_ADMIN + '/cobros_clientes/recibo/' + id, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', },
			});
			const data = await response.json();
			return data;
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
	lugares:{
		async create(data) {
            const response = await fetch(config.URL_ADMIN + '/lugares', {
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
            const response = await fetch(config.URL_ADMIN + `/lugares/baja/${id}`, {
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
            const response = await fetch(config.URL_ADMIN + `/lugares/habilitar/${id}`, {
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
			const response = await fetch(config.URL_ADMIN + '/niveles_lugares/lista?'+params, {
				method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const data = await response.json();
			return data;
        },
        async DescargarQr(id){
			const res = await fetch(config.URL_ADMIN + '/lugares/descargar/qr/'+id, {
				method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const responseData = await res.json();
            return responseData;
        },
        async ImprimirQr(id){
			const res = await fetch(config.URL_ADMIN + '/lugares/qr/imprimir/'+id, {
				method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const buf = await res.arrayBuffer();
            const file = await new File([buf], id + '.pdf', { type: 'application/pdf' })
            return file;
        },
        async QR(id){
			const response = await fetch(config.URL_ADMIN + '/lugares/qr/generar/'+id, {
				method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const data = await response.json();
			return data;
        },
        async getLista(params = ''){
			const response = await fetch(config.URL_ADMIN + '/lugares/lista?' + params, {
				method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
                },
			});
			const data = await response.json();
			return data;
        },
        async getLugar(id){
			const response = await fetch(config.URL_ADMIN + '/lugares/'+id, {
				method: 'GET',
                headers: {'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
            },
			});
			const data = await response.json();
			return data;
		},
		async getAll(params = ''){
			const response = await fetch(config.URL_ADMIN + '/lugares?'+params, {
				method: 'GET',
                headers: {'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`
            },
			});
			const data = await response.json();
			return data;
		},
		async update(data){
            const response = await fetch(config.URL_ADMIN + '/lugares', {
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
            const response = await fetch(config.URL_ADMIN + '/lugares/clave', {
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
            const response = await fetch(config.URL_ADMIN + '/lugares/cambiarClave', {
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
	alicuotas: {
		async getAll(params = '') {
			const response = await fetch(config.URL_ADMIN + '/alicuotas&' + params, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', },
			});
			const data = await response.json();
			return data;
		},
	},
	condicionventa: {
		async getAll(query = '') {
			const response = await fetch(config.URL_ADMIN + '/condicionventa?' + query, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await response.json();
			return data;
		},
	},
	puntosdeventas: {
		async getAll(query = '') {
			const response = await fetch(config.URL_ADMIN + '/puntosdeventas?' + query, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await response.json();
			return data;
		},
	},
	clientes: {
		async getAll(params = '') {
			const response = await fetch(config.URL_ADMIN + '/clientes&' + params, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', },
			});
			const data = await response.json();
			return data;
		},
	},
	fleteros: {
		async getAll(params = '') {
			const response = await fetch(config.URL_ADMIN + '/fleteros&' + params, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', },
			});
			const data = await response.json();
			return data;
		},
	},
	fpago: {
		async getAll(query = '') {
			const response = await fetch(config.URL_ADMIN + '/formas_pago&' + query, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', },
			});
			const data = await response.json();
			return data;
		},
	},
	cuentas_bancarias: {
		async getAll(params = '') {
			const response = await fetch(config.URL_ADMIN + '/cuentas_bancarias&' + params, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', },
			});
			const data = await response.json();
			return data;
		},
	},
};
