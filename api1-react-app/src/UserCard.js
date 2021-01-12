import React from "react";
import axios from "axios";

const UserCard = ({ user, handleEdit }) => {
  const handleDelete = () => {
    console.log(user.id);
    axios
      .delete(`http://localhost:5000/api/users/${user.id}`)
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="user-card">
        <div>{user.name}</div>
        <div>{user.bio}</div>
        <button onClick={handleEdit}>Edit user</button>
        <button onClick={handleDelete}>Delete user</button>
      </div>
    </div>
  );
};

export default UserCard;
