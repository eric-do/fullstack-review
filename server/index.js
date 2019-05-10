const express = require('express');
let app = express();
let parser = require('body-parser');
let github = require('../helpers/github');

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(req, res);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

