const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', () => {

// });

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

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log('trying to save record(s)');
  
  repos.forEach(repo => {
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

    newRepo.save((err, repo) => {
      if (err) { return console.error(err); }
      console.log(`inserted ${repo.name} to fetcher db`);
    })
  });
}

module.exports.save = save;