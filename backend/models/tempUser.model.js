import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema(
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
    otp: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      default: () => Date.now() + 5 * 60 * 1000,
      index: { expires: 0 },
    },
  },
  { timestamps: true }
);

const TempUser = mongoose.model("TempUser", tempUserSchema);

export default TempUser;
