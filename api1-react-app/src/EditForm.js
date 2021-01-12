import React from "react";

const EditForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" value="" placeholder="name" />
        </label>

        <label>
          Bio
          <input type="text" name="bio" value="" placeholder="bio" />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default EditForm;
