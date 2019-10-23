import Phaser from 'phaser';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import DatabaseManager from '../data/DatabaseManager';
import firebaseConfig from './firebaseConfig';

export default class WebManager {
  constructor(phaserConfig) {
    this.phaserConfig = phaserConfig;
  }

  initializeFirebase() {
    firebase.initializeApp(firebaseConfig.firestore);
    this.authUi = new firebaseui.auth.AuthUI(firebase.auth());
    this.authUi.start('#firebaseui-auth-container', firebaseConfig.ui);
  }

  setupCallbacks() {
    // When a user signs in or out update the auth ui and restart the game
    // Note that this will be called when auth initializes on game load (with no user)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.showUserProfileUi(user);
        this.hideMoreInfo();
        this.authUi.reset();
        this.restartGame();
      } else {
        this.showLoginUi();
        this.authUi.start('#firebaseui-auth-container', firebaseConfig.ui);
        this.restartGame();
      }
    });

    // sign out the user and update the auth ui
    document.getElementById('sign-out-button').addEventListener('click', () => {
      firebase.auth().signOut().then(() => this.showLoginUi());
    });

    // disable game input when the auth modal has focus
    document.getElementById('modal-toggle').addEventListener('change', function() {
      if (this.checked) {
        document.getElementsByName('email')[0].focus();
        window.game.input.keyboard.enabled = false;
      } else {
        window.game.input.keyboard.enabled = true;
      }
    });
  }

  createGame() {
    window.game = new Phaser.Game(this.phaserConfig);
    window.game.db = new DatabaseManager();
    window.game.web = this;
    window.game.fullyLoaded = false;
  }

  restartGame() {
    if (window.game != null) {
      window.game.events.addListener('destroy', () => this.createGame());
      window.game.destroy(true);
    } else {
      this.createGame();
    }
  }

  // Private

  showLoginUi() {
    document.getElementById('sign-in-modal').style.display = 'inline-block';
    document.getElementById('modal-toggle').checked = false;
    document.getElementById('user-info').style.display = 'none';
  }

  showUserProfileUi(user) {
    document.getElementById('sign-in-modal').style.display = 'none';
    document.getElementById('user-info').style.display = 'inline-block';
    document.getElementById('username').innerHTML = user.email;
  }

  hideMoreInfo() {
    document.getElementById('more-info-container').style.display = 'none';
  }
}
