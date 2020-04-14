# Dead Language

Dead Language is a zombie-themed language learning video game built using JavaScript and the PhaserJS game framework. It combines fast-paced zombie blasting gameplay and vocab study in a single package in a way that I hope is a little more entertaining than flashcards.

## Links

* [deadlanguage.io](https://www.deadlanguage.io): The game
* [Project write-up](https://www.projects.sethpuckett.com/dead-language/): Background and technical overview
* [Dev log](https://www.log.deadlanguage.io/): Follow development progress

## Developer Notes

To run locally install the npm dependencies and start the server. Webpack will watch for changes.

```bash
$ npm install
$ npm run start
```

To deploy to production
```bash
$ npm run deploy
```

If npm throws syntax errors make sure you're using the correct version of node.

```
$ nvm use 10.15.1
```

To update Firebase Functions run the following command after updating `functions/index.js`

```bash
$ firebase deploy --only functions
```