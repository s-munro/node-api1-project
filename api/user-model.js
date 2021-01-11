const shortid = require("shortid");

let users = [
  { id: shortid.generate(), name: "Sam", bio: "Lambda student" },
  { id: shortid.generate(), name: "Jamie", bio: "Law student" },
];

module.exports = {
  findAll() {
    return Promise.resolve(users);
  },

  findById(id) {
    const user = users.find((user) => user.id === id);
    return Promise.resolve(user);
  },

  create({ name, bio }) {
    const newUser = { id: shortid.generate(), name, bio };
    users.push(newUser);
    return Promise.resolve(newUser);
  },

  update(id, changes) {
    const user = users.find((user) => user.id === id);
    if (!user) return Promise.resolve(null);

    const updatedUser = { ...changes, id };
    const users = users.map((user) => (user.id === id ? updatedUser : user));
    return Promise.resolve(updatedUser);
  },

  delete(id) {
    const user = users.find((user) => user.id === id);
    if (!user) return Promise.resolve(null);

    users = users.filter((user) => user.id !== id);
    return Promise.resolve(user);
  },
};
