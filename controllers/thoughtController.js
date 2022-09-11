// Import the user and thought models
const { Thought, User } = require("../models");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  // Finds all of the thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((error) => res.status(500).json(error));
  },
  //   Finds a single thought by its ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Couldn't find a thought with that ID." })
          : res.json(thought)
      )
      .catch((error) => res.status(500).json(error));
  },
  //   Creates a new thought and associates it with the user passed in
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought.body } },
          { new: true }
        );
      })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  //   Update a user's thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //   Delete a thought by its id
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : User.findOneAndUpdate(
              { thought: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Thought deleted, but no user with that ID" })
          : res.json({ message: "Thought Deleted!" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
