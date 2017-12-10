const express = require('express');
const igdb = require('igdb-api-node').default;
const app = express();
const client = igdb(/** ICI La clé d'API **/);

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/search/:text', (req, res) => {
  return client.games({
      fields: '*',
      limit: 20,
      offset: 0,
      search: req.params.text
  }).then(igdbResponse => {
    res.send(igdbResponse.body);
  });
});

app.get('/game/:id', (req, res) => {
  return client.games({
      fields: '*',
      ids: [req.params.id]
  }).then(igdbResponse => {
    res.send(igdbResponse.body[0]);
  });
});

app.listen(3000, () => console.log('IGDB app listening on port 3000!'));
