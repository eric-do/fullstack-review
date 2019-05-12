import React from 'react';
import User from './User.jsx';

var Users = (props) => (
  // Props:
  //  List of all users in db
  <div className="user-list">
    <h4>Users</h4>
    <div className="status">There are {props.users.length} users.</div>
    <table>
      <thead>
        <tr>
          <th scope="col">User</th>
          <th scope="col">Total repos</th>
        </tr>
      </thead>
      <tbody>
    {
      Object.keys(props.users).map(user => (
        <User user={user} count={props.users[user]}/>
      ))
    }
    </tbody>
    </table>
  </div>

);

export default Users;