// Import the models of the user and thought
const { User, Thought } = require("../models");
// const { ObjectId } = require("mongoose").Types;

// Get all users
module.exports = {
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .populate("friends")
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
  //   Get one user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Username not found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //   Create a new user
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
  // Adds a friend to a user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user found with this ID" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
    console.log(req.params.userId);
  },
  // Deletes a friend from a user
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user found with this ID" })
          : res.status(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  //   Delete a user and their thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Username not found" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
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
