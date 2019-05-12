import React from 'react';

var UserEntry = (props) => (
  <tr>
    <td onClick={(e) => {
        props.changeView(e, 'user');
        props.friendsHandler(e, props.user);
      }}>{props.user}</td>
    <td>{props.count}</td>
  </tr>
);

export default UserEntry;

//changeView={this.changeView} friendsHandler={props.friendsHandler}