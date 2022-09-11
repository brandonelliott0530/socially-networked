// require mongoose for setting up the schema for the user model
const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const reactionSchema = require("./Reaction");
// Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJson: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual to count the amount of reactions on a thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);
module.exports = Thought;
