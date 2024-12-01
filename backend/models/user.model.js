import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: [3, "Username name must be at least 3 characters long"],
      maxlength: [10, "Username name must be less than 10 characters"],
    },
    uniqueName: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Unique name must be at least 3 characters long"],
      maxlength: [10, "Unique name must be less than 7 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoName: {
      type: String,
      default: null,
    },
    photoPath: {
      type: String,
      default: null,
    },
    photoSize: {
      type: String,
      default: null,
    },
    incomingFriendRequests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    outgoingFriendRequests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
