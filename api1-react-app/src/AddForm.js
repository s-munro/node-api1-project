import React, { useState } from "react";
import axios from "axios";

const initialFormValues = {
  name: "",
  bio: "",
};

const AddForm = () => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: formValues.name,
      bio: formValues.bio,
    };

    console.log(newUser);

    axios
      .post("http://localhost:5000/api/users", {
        name: formValues.name,
        bio: formValues.bio,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>Add User</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Bio
          <input
            type="text"
            placeholder="bio"
            name="bio"
            value={formValues.bio}
            onChange={handleChange}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddForm;
