const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('countdown');
    const conundrumCollection = db.collection('conundrumWords');
    const conundrumRouter = createRouter(conundrumCollection);
    app.use('/api/conundrum-words', conundrumRouter);

    const playerCollection = db.collection('players')
    const playersRouter = createRouter(playerCollection)
    app.use('/api/players', playersRouter)
  })
  .catch(console.err);

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});