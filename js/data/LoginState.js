
export default {
  // No user is authenticated
  LOGGED_OUT: 'logged-out',

  // User is authenticated and has an entry in the firebase 'users' collection
  LOGGED_IN: 'logged-in',

  // User is authenticated, but entry has not yet been created in firebase 'users' collection
  REGISTERING: 'registering',
};
