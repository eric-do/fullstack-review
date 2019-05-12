import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <div className="status">There are {props.repos.length} repos.</div>
    <table>
    <thead>
        <tr>
            <th scope="col">User</th>
            <th scope="col">Repo</th>
            <th scope="col">Forks</th>
        </tr>
    </thead>
    <tbody>
    { 
      props.repos.map(repo => (
        <tr>
          <td>{repo.owner_login}</td>
          <td><a href={repo.html_url}>{repo.name}</a> </td>
          <td>{repo.forks_count}</td>
        </tr>
      ))
    }
    </tbody>
    </table>
  </div>
)

export default RepoList;