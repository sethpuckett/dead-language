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
    apiKey: 'AIzaSyDNT9QuLFOikb9floGWNqqw6fo31pNgMts',
    authDomain: 'dead-langauge.firebaseapp.com',
    databaseURL: 'https://dead-langauge.firebaseio.com',
    projectId: 'dead-langauge',
    storageBucket: 'dead-langauge.appspot.com',
    messagingSenderId: '956438051996',
    appId: '1:956438051996:web:65ffd257977394ad',
  },
};
