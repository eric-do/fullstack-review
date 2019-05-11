const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
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

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log('trying to save record(s)');
  let reposArray = repos.map(repo => {
    let newRepo = new Repo({
      id:           repo.id,            
      name:         repo.name,         
      html_url:     repo.html_url,    
      description:  repo.description,   
      forks_count:  repo.forks_count,        
      forks_url:    repo.forks_url,         
      owner_id:     repo.owner.id,     
      owner_login:  repo.owner.login  
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

module.exports.save = save;
module.exports.getTop25 = getTop25;