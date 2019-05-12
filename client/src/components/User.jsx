import React from 'react';

var User = (props) => (
  <tr>
    <td>{props.user}</td>
    <td>{props.count}</td>
  </tr>
);

export default User;