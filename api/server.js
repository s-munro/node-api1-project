const express = require("express");

const User = require("./user-model");

const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

server.post("/api/users", (req, res) => {
  const user = req.body;
  const name = user.name;
  const bio = user.bio;
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    User.create({ name, bio })
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((error) => {
        res.status(500).json({
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

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!changes.name || !changes.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    User.update(id, changes)
      .then((returnedUser) => {
        if (!returnedUser) {
          res.status(404).json({
            message: "The user with the specified ID does not exist.",
          });
        } else {
          res.status(200).json(returnedUser);
        }
      })
      .catch((error) => {
        res.status(500).json({
          errorMessage: "The user information could not be modified.",
        });
      });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.delete(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

module.exports = server;