import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() {
    this.updateRepoList();
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

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      data: {username: term.toString()},
      success: () => console.log('success'),
      error: () => console.log('error')
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));