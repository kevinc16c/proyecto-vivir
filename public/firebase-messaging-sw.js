// Otorga acceso al trabajador del servicio a Firebase Messaging.
// Tenga en cuenta que solo puede usar Firebase Messaging aquí. Otras bibliotecas de Firebase
// no están disponibles en el trabajador de servicio.
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

// Inicialice la aplicación de Firebase en el trabajador del servicio pasando
// el objeto de configuración de Firebase de su aplicación.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDN02SYxwviokejIqk1Y6XKYAp3F-cpvVo",
    authDomain: "vivir-carlos-paz.firebaseapp.com",
    databaseURL: "https://vivir-carlos-paz.firebaseio.com",
    projectId: "vivir-carlos-paz",
    storageBucket: "vivir-carlos-paz.appspot.com",
    messagingSenderId: "928777933335",
    appId: "1:928777933335:web:47507668be371b3b21c252",
    measurementId: "G-XZWT4YW5XG"
});

// Recupera una instancia de Firebase Messaging para que pueda manejar mensajes en segundo plano.
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   // Customize notification here
//   const notificationTitle = 'llega';
//   const notificationOptions = {
//     body: 'si loco.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });


messaging.setBackgroundMessageHandler(function (payload) {
    console.log('Handling background message ', payload);
  
    return self.registration.showNotification(payload.data.title, {
      body: payload.data.body,
      icon: payload.data.icon,
      tag: payload.data.tag,
      data: payload.data.link
    });
  });

  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(self.clients.openWindow(event.notification.data));
  });
