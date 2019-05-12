import React from 'react';

var UserPage = (props) => (
  <div>
    <h4>{props.user}'s Page</h4>
    <div className="status">{props.user} has {props.friends.length} friends.</div>
    <table>
      <thead>
        <tr>
          <th scope="col">Friend</th>
        </tr>
      </thead>
      <tbody>
        {
          props.friends.map(friend => (
            <tr><td>{friend}</td></tr>
          ))
        }
      </tbody>
    </table>
  </div>  
)

export default UserPage;