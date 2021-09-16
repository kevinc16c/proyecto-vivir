
import 'isomorphic-fetch';
import {config} from 'config'

export const api = {
	pedidos:{
		async getCantidad_EnPreparacion(query = ''){
			const response = await fetch(config.URL_ADMIN + `/pedidos/delivery/contador/1?${query}`, {
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
};
	