import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

export default {
  ui: {
    callbacks: {
      signInSuccessWithAuthResult: () => false,
      uiShown: () => { document.getElementById('auth-loader').style.display = 'none'; },
    },
    signInOptions: [{
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    }],
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  },

  firestore: {
    apiKey: "AIzaSyCyzFe4B4t0nqRXnn0kV5MF7UViqghScyY",
    authDomain: "dead-language.firebaseapp.com",
    databaseURL: "https://dead-language.firebaseio.com",
    projectId: "dead-language",
    storageBucket: "dead-language.appspot.com",
    messagingSenderId: "352281236042",
    appId: "1:352281236042:web:85411d0ca6d5ae39",
    measurementId: "G-NZSHYPE0G4"
  },
};
