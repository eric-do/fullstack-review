const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const github = require('../helpers/github');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  _id:          Schema.Types.ObjectId,
  id:           {type: Number,  // repo.id
                 unique: true
                },         
  name:         String,         // repo.name
  html_url:     String,         // repo.html_url
  description:  String,         // repo.description
  forks_count:  Number,         // repo.forks_count
  forks_url:    String,         // repo.forks_url
  owner_id:     Number,         // repo.owner.id
  owner_login:  String          // repo.owner.login
});

let contributorSchema = mongoose.Schema({
  repo:         {type: Schema.Types.ObjectId, ref: 'Repo'},
  repo_name:    String,
  login:        String,
  html_url:     String,
  owner_login:  String
});

//contributorSchema.index({repo: 1, login: 1}, {unique: true});

let Repo = mongoose.model('Repo', repoSchema);
let Contributor = mongoose.model('Contributor', contributorSchema);

let save = (repos, callback) => {
  // TODO: Your code here
  // Input: an array of repos, a callback function
  // For each repo
  //  Add to an array of save() promises
  //  Make a github API call to get all the contributors attached to the repo
  //  Save these contributor documents to a separate collection
  //  Note, it's not necessary for the repo save() to wait on the contributor process
  // Once they've been created, a callback function is invoked, presume to send status to user
  console.log('trying to save record(s)');
  let reposArray = repos.map(repo => {
    let newRepo = new Repo({
      _id:          new mongoose.Types.ObjectId(),
      id:           repo.id,            
      name:         repo.name,         
      html_url:     repo.html_url,    
      description:  repo.description,   
      forks_count:  repo.forks_count,        
      forks_url:    repo.forks_url,         
      owner_id:     repo.owner.id,     
      owner_login:  repo.owner.login  
    });
    
    let contributors_url = repo.contributors_url;
    github.getContributorsByRepo(contributors_url, (err, data) => {
      if (err) { return console.error(err); }
      saveContributors(data, newRepo, (err) => {
        if (err) { return console.error(err); }
          console.log('Contributors have been saved');
      });
    });

    return newRepo.save();
  });

  Promise.all(reposArray)
  .then(() => {
    console.log('Successfully added all');
    callback();
  })
  .catch((e) => {
    console.error(e);
  });
}

let getTop25 = (callback) => {
  Repo.find({}, 'name html_url forks_count forks_url owner_login')
  .limit(25)
  .sort({forks_count: -1})
  .exec(callback);
}

let saveContributors = (contributors, repo, callback) => {
  // Input: an array of contributor objects, a repoID, a callback function
  // Map contributors
  //  Create new contributor object
  //   Set repo to repoId
  //   Login = contributor.login
  //   html_url = contributor.html_url
  //  Return newContributor.save()
  // Use promise.all to execute contributor object
  // Execute callback upon completion

  var newContributors = contributors.map(contributor => (
    {
      repo: repo._id,
      repo_name: repo.name,
      login: contributor.login,
      html_url: contributor.html_url,
      owner_login: repo.owner_login
    }
  ));
  Contributor.insertMany(newContributors)
  .then(data => callback(null, data))
  .catch(e => {
    return console.error(e);
  });
}

let getUsers = (callback) => {
  Repo.find().exec((err, data) => {
    if (err) { return console.error(err); }
    var counts = data.reduce((map, row) => {
      console.log(row.owner_login, map[row.owner_login]);
      map[row.owner_login] = ++map[row.owner_login] || 1;
      return map;
    }, {});
    callback(null, JSON.stringify(counts));
  });
}

let getFriends = (owner, callback) => {
  Contributor.find({owner_login: owner, login: {$ne: owner}})
  .exec((err, data) => {
    var friendsArray = data.map(friendObj => friendObj.login);
    console.log(`${owner}'s friends: `);
    console.log(friendsArray);
    callback(null, friendsArray);
  })
}

module.exports.save = save;
module.exports.getTop25 = getTop25;
module.exports.saveContributors = saveContributors;
module.exports.getUsers = getUsers;
module.exports.getFriends = getFriends;