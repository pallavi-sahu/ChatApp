// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA2SHsvQoqRlBPN30InlzorOZ71G6Ms8SY",
    authDomain: "whatsapp-6d650.firebaseapp.com",
    projectId: "whatsapp-6d650",
    storageBucket: "whatsapp-6d650.appspot.com",
    messagingSenderId: "621162183801",
    appId: "1:621162183801:web:2a1b980dab30ede22828a8",
    measurementId: "G-SH2N8FEYF7"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db; 
  