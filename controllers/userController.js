// Import the models of the user and thought
const { User, Thought } = require("../models");

// Get all users
module.exports = {
  getUsers(req, res) {
    User.find().then((users) => res.json(users));
  },
  //   Get one user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Username not found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //   reate a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //   Updates a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //   Delete a user and their thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Username not found" })
          : Thought.deleteMany({ _id: req.params.userId })
      )
      .then(() =>
        res.json({
          message:
            "User and their associated thoughts were deleted successfully.",
        })
      )
      .catch((err) => res.status(500).json(err));
  },
};
