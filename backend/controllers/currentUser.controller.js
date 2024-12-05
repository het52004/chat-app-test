import { generateToken } from "../helpers/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { uploadOnCloudinary } from "../lib/cloudinary.js";

export const getCurrentUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }
    res.json({
      success: true,
      message: "User details fetched successfully!",
      userData: user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message:
        "An error has been occured while fetching your data please try to login again!",
    });
  }
};

export const updateCurrentUserDetails = async (req, res) => {
  const user = req.user;
  const { userName, uniqueName, password } = req.body;
  const { filename, path, size } = req.file || {};

  if (!userName || !uniqueName || !password) {
    res.json({ success: false, message: "Please fill all the details!" });
  }
  try {
    const isPasswordCorrect = await bcrypt.compare(password, req.user.password);
    if (!isPasswordCorrect) {
      res.json({ success: false, message: "Please enter correct password!" });
    } else {
      user.userName = userName;
      user.uniqueName = uniqueName;
      if (req.file) {
        const resp = await uploadOnCloudinary(path);
        user.photoPath = resp.secure_url;
        user.photoSize = resp.bytes;
        user.photoName = filename;
      }
      await user.save();
      generateToken(user, res);
      res.json({
        success: true,
        message: "Profile has been updated successfully!",
        userData: user,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message:
        "An error had been occured while updating your details, please try again!",
    });
  }
};

export const deleteCurrentUser = async (req, res) => {
  const userId = req.user._id.toString();
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.json({
        success: false,
        message: "The account you are trying to delete does not exist!",
      });
    } else {
      res.clearCookie("jwt");
      return res.json({
        success: true,
        message: "Your account has been deleted successfully!",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message:
        "An error has been occured while deleting your account please try again!",
    });
  }
};
