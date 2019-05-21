import Phaser from 'phaser';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import Minigame from './screens/minigame/Minigame';
import Boot from './screens/Boot';
import Loading from './screens/Loading';
import TitleMenu from './screens/titleMenu/TitleMenu';
import Endgame from './screens/Endgame';
import VocabStudy from './screens/vocabStudy/VocabStudy';
import DatabaseManager from './data/DatabaseManager';
import { database } from './config';

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 800,
  height: 600,
  pixelArt: true,
  scene: [
    Boot,
    Loading,
    TitleMenu,
    Minigame,
    Endgame,
    VocabStudy,
  ],
};

function createGame() {
  window.game = new Phaser.Game(config);
  window.game.db = new DatabaseManager();
  window.game.fullyLoaded = false;
}

function restartGame() {
  if (window.game != null) {
    window.game.events.addListener('destroy', () => {
      createGame();
    });
    window.game.destroy(true);
  } else {
    createGame();
  }
}

firebase.initializeApp(database.firestoreConfig);
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('sign-in-modal').style.display = 'none';
    document.getElementById('user-info').style.display = 'inline-block';
    document.getElementById('username').innerHTML = user.email;
    // User is signed in.
    // const displayName = user.displayName;
    // const email = user.email;
    // const emailVerified = user.emailVerified;
    // const photoURL = user.photoURL;
    // const isAnonymous = user.isAnonymous;
    // const uid = user.uid;
    // const providerData = user.providerData;
    restartGame();
  } else {
    document.getElementById('sign-in-modal').style.display = 'inline-block';
    document.getElementById('user-info').style.display = 'none';
    restartGame();
  }
});

document.getElementById('sign-out-button').addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    document.getElementById('sign-in-modal').style.display = 'inline-block';
    document.getElementById('modal-toggle').checked = false;
    document.getElementById('user-info').style.display = 'none';
  });
});

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult(_authResult, _redirectUrl) {
      return false;
    },
    uiShown() {
      document.getElementById('auth-loader').style.display = 'none';
    },
  },
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  requireDisplayName: false,
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
