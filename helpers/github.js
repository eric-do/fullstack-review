const request = require('request');
const config = require('../config.js');
let db = require('../database');

let getReposByUsername = (req, res, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  //https://api.github.com/search/repositories?q=user:eric-do
  var username = req.body.username;
  const url = `https://api.github.com/search/repositories?q=user:${username}`;
  console.log(`Getting repos by username ${username}`);
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    if (error) { return console.error(error); }
    var results = JSON.parse(body).items;
    db.save(results, (err, data) => {
      callback();
    });
  });

}

let getContributorsByRepo = (url, callback) => {
  // Input: a contributors url, a callback function
  // We don't really need any other options except the url and headers
  // The url should respond with an array of contributors
  // We pass this array to the callback
  var options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    if (err) { return console.error(err); }
    var results = JSON.parse(body);
    console.log(`URL: ${url}
                 Contributors: ${results.length}`);
    callback(null, results);
  });

}

module.exports.getReposByUsername = getReposByUsername;
module.exports.getContributorsByRepo = getContributorsByRepo;