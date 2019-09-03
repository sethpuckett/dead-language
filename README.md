# dead-language
Language Learning Zombie Game

## Developer Notes

To run locally install the npm dependencies and start the server. Webpack will watch for changes.

```bash
$ npm install
$ npm run start
```

To update Firebase Functions run the following command after updating `functions/index.js`

```bash
$ firebase deploy --only functions
```