
import 'isomorphic-fetch';
import {config} from 'config'

export const api = {
		ordenes:{
			async getAll(query = '') {
				const response = await fetch(config.URL_ADMIN + '/dash/ordenes?'+ query, {
					method: 'GET',
					headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
				});
				const data = await response.json();
				return data;
			},
			async getAllValid(query = '') {
				const response = await fetch(config.URL_ADMIN + '/ordenes/vto?'+ query, {
					method: 'GET',
					headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
				});
				const data = await response.json();
				return data;
			},
		},
};
	