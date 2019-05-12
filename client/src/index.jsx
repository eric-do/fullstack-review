import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Users from './components/Users.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      users:{},
      view: 'top'
    }
  }

  componentDidMount() {
    this.updateRepoList();
    this.getUsers();
  }

  updateRepoList() {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      success: (repos) => {
        console.log(repos);
        this.setState({
          repos: repos
        });
      },
      error: () => console.log('Error getting top 25')
    });
  }

  getUsers() {
    $.ajax({
      url: 'http://localhost:1128/users',
      method: 'GET',
      success: (users) => {
        console.log(users);
        this.setState({
          users: users
        });
      },
      error: () => console.log('Error getting users')
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      data: {username: term.toString()},
      success: (repos) => {
        console.log('success');
        this.setState({
          repos: repos
        });
      },
      error: () => console.log('error')
    });
  }

  /* CONTROLLERS */
  navHandler(e, view) {
    e.preventDefault();
    this.setState({
      view: view
    });
  }

  render () {
    let view;
    if (this.state.view === 'top') {
      view = (
        <div>
        <RepoList repos={this.state.repos}/>
        <Search onSearch={this.search.bind(this)}/>
        </div>
      );
    } else if (this.state.view = 'users') {
      view = <Users users={this.state.users}/>
    }

    return (<div>
      <h1>Github Fetcher</h1>
      <ul>
        <li onClick={(e) => this.navHandler(e, 'top')} className="nav-item">Top 25</li>
        <li onClick={(e) => this.navHandler(e, 'users')} className="nav-item">Users</li>
      </ul>
      {view}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));