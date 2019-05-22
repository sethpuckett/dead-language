const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// This method creates a user profile entry in firestore whenever a new user is created
exports.addUserToDatabase = functions.auth.user().onCreate(user => {
  admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    admin: false,
  });
});