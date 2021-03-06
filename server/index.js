const express = require('express');
let app = express();
let parser = require('body-parser');
let github = require('../helpers/github');
let db = require('../database');

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(req, res, (err) => {
    if (err) { return console.error(err); }
    db.getTop25((err, data) => {
      if (err) { return console.error(err); }
      res.json(data);
    })
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.getTop25((err, data) => {
    if (err) { return console.error(err); }
    console.log(data.length);
    res.send(data);
  });
});

app.get('/users', (req, res) => {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.getUsers((err, data) => {
    if (err) { return console.error(err); }
    //console.log(data.length);
    console.log(data);
    res.send(JSON.parse(data));
  });
});

app.post('/friends', (req, res) => {
  var username = req.body.username;
  db.getFriends(username, (err, data) => {
    if (err) { return console.error(err); }
    console.log('sending data');
    res.json(data);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

