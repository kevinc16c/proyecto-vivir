import firebase from 'firebase/app'
import 'firebase/messaging'

var firebaseConfig = {
    apiKey: "AIzaSyDN02SYxwviokejIqk1Y6XKYAp3F-cpvVo",
    authDomain: "vivir-carlos-paz.firebaseapp.com",
    databaseURL: "https://vivir-carlos-paz.firebaseio.com",
    projectId: "vivir-carlos-paz",
    storageBucket: "vivir-carlos-paz.appspot.com",
    messagingSenderId: "928777933335",
    appId: "1:928777933335:web:47507668be371b3b21c252",
    measurementId: "G-XZWT4YW5XG"
}

firebase.initializeApp(firebaseConfig);

export default firebase