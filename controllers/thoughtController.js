// Import the user and thought models
const { Thought, User } = require("../models");

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
  //   Creates a new application and associates it with the user passed in
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought.id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Created new thought, but there's no user with that ID.",
            })
          : res.json("New thought created 💭")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //   Update a user's thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.body.thoughtId },
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
