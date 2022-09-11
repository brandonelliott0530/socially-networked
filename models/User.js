// require mongoose for setting up the schema for the user model
const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongoose").Types;

// requires the mongoose unique validator for the usernames and emails
const uniqueValidator = require("mongoose-unique-validator");

// Function to check if an email is a valid email address.
function validateEmail(email) {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

// User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Please enter a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
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

// Virtual to list the number of friends a user has
userSchema.virtual("friendCound").get(function () {
  let friends = this.friends;
  let friendsCount = 0;
  for (let i = 0; i <= friends.length; i++) {
    friendsCount += i;
  }
  return friendsCount;
});

const User = model("user", userSchema);

userSchema.plugin(uniqueValidator);

module.exports = User;
