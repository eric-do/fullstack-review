import React from 'react';
import UserEntry from './UserEntry.jsx';

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
        <UserEntry changeView={props.changeView} friendsHandler={props.friendsHandler} user={user} count={props.users[user]}/>
      ))
    }
    </tbody>
    </table>
  </div>

);

export default Users;