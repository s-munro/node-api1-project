import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import EditForm from "./EditForm";
import AddForm from "./AddForm";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Sam's first API</h2>
      {users.map((user) => {
        return <UserCard key={user.id} user={user} />;
      })}
      <AddForm />
    </div>
  );
};

export default App;
