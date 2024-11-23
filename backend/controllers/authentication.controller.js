import User from "../models/user.model.js";
import { generateToken } from "../helpers/generateToken.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { userName, uniqueName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    const uniqueNameExists = await User.findOne({ uniqueName });
    if (uniqueNameExists) {
      res.json({
        success: false,
        message: "A user with this unique name already exists!",
      });
    } else if (existingUser) {
      res.json({
        success: false,
        message: "A user with this email address already exists!",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await User.create({
        userName,
        uniqueName,
        email,
        password: hashedPassword,
      });
      // await createdUser.save();
      if (createdUser) {
        const token = generateToken(createdUser, res);
        res.json({
          success: true,
          message: "User has been registered successfully!",
          userData: createdUser,
          accessToken: token,
        });
      } else {
        res.json({ success: false, message: "Failed to create a new user!" });
      }
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.json({
        success: false,
        message: error.message,
      });
    } else {
      return res.json({
        success: false,
        message: "An error has occured during signup please try again!",
      });
    }
  }
};

export const login = async (req, res) => {
  const { uniqueName, password } = req.body;
  try {
    const user = await User.findOne({ uniqueName });
    if (!user) {
      res.json({
        success: false,
        message: "User does not exist please check your details again!",
      });
    } else {
      try {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          res.json({
            success: false,
            message: "The password you entered is wrong!",
          });
        } else {
          const token = generateToken(user, res);
          res.json({
            success: true,
            message: "User has been logged in successfully!",
            userData: user,
            accessToken: token,
          });
        }
      } catch (error) {
        console.log(error);

        return res.json({
          success: false,
          message: "An error occured during decrypting the password!",
        });
      }
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occured during user login! Please try logging again",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.json({ success: true, message: "Logged out successfully" });
};
