import {config} from '../../config'

export const api = {
	notificaciones:{
		async create(data) {
            const response = await fetch(config.URL_ADMIN + '/notificaciones/topicos', {
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
		async getAll(params = ''){
			const response = await fetch(config.URL_API + '/subgrupos/'+params, {
				method: 'GET',
				headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const data = await response.json();
			return data;
		},
		async baja(id){
            const response = await fetch(config.URL_API + `/subgrupos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify(id)
    	});
            const responseData = await response.json();
            return responseData;
        },
		async update(data){
            const response = await fetch(config.URL_API + '/subgrupos', {
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
	},
	grupos:{
		async getAll(){
			const response = await fetch(config.URL_API + '/grupos', {
				method: 'GET',
				headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
			const data = await response.json();
			return data;
		},
	},
};
		