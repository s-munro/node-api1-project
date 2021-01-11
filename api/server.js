const express = require("express");

const User = require("./user-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    User.create({ name, bio })
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((error) => {
        res
          .status(500)
          .json({
            errorMessage:
              "There was an error while saving the user to the database",
          });
      });
  }
});

server.get("/api/users", (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved.",
      });
    });
});

module.exports = server;
