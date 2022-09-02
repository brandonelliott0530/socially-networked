// require mongoose for setting up the schema for the user model
const { Schema, model } = require("mongoose");

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
      default: Date.toDateString(),
    },
    userName: { type: String, required: true },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "reaction",
      },
    ],
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
  let reactions = this.reactions;
  let reactionCount = 0;
  for (let i = 0; i < reactions.length; i++) {
    reactionCount += i;
  }
  return friendsCount;
});

const Thought = model("thought", thoughtSchema);
module.exports = Thought;
