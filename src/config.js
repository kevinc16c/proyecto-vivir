export const config = {
    URL_ADMIN: 'https://www.vivircarlospaz.com/admin',
    URL_PANEL: 'https://www.vivircarlospaz.com/panel',
    URL_SERVER: 'https://www.vivircarlospaz.com/static',
    URL_STATIC: 'https://www.vivircarlospaz.com/static',
    URL_IMG: 'https://www.vivircarlospaz.com',
    COLOR: ['', 'volcano', 'geekblue', 'green'],
    PRIORIDAD: ['', 'Alta', 'Media', 'Baja'],
    APP_ID_MP: process.env.NODE_ENV === "production" ? '5218861749605070' : '1182502572387360', // ID PRODUCCION
    CLIENT_SECRET_MP: process.env.NODE_ENV === "production" ? 'OB1qO8BNyX6XGs7erFd9fOdaGm9JGRp8' : 'TOaTTFhS0vBAgj1KzxXihWu2OR4drcnY', // KEY PRODUCCION
    CLIENT_ID: process.env.NODE_ENV === "production" ? '5218861749605070' : '1182502572387360', //ID PRODUCCION
    URL_SV: 'https://www.vivircarlospaz.com/',
    estados: {
        RECIBIDO: 1, //Recibimos tu pedido. Podés realizar un seguimiento en la sección de Mis Pedidos.
        ACEPTADO: 2, //Tu pedido ha sido aceptado. Te esperamos!
        EN_PREPARACION: 3, //Tu pedido está en preparación
        EN_CAMINO: 4, //Tu pedido está en camino
        ENTREGADO: 5, //Tu pedido ha sido entregado
        CANCELADO: 6, //Tu pedido ha sido cancelado
        RECHAZADO: 7, //Tu pedido ha sido rechazado
    }
}