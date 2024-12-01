import User from "../models/user.model.js";
import { generateToken } from "../helpers/generateToken.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../helpers/emailUtils.js";
import TempUser from "../models/tempUser.model.js";
import { deleteFile } from "../helpers/deleteFile.js";
import { uploadOnCloudinary } from "../lib/cloudinary.js";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const checkSentOtp = async () => {};

export const verifyUser = async (req, res) => {
  const { userName, uniqueName, email, password } = req.body;
  const { filename, path, size } = req.file;
  if (!userName || !uniqueName || !email || !password) {
    return res.json({
      success: false,
      message: "Please fill all the details!",
    });
  }
  try {
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
      const existingTempUser = await TempUser.findOne({ email });
      if (existingTempUser) {
        res.json({
          success: false,
          message: `We have already send you OTP on your email ${email} please recheck`,
        });
      } else {
        const otp = generateOTP();
        await sendEmail(userName, email, otp, res);
        const newUser = TempUser.create({
          userName,
          uniqueName,
          email,
          password,
          otp,
          photoName: filename,
          photoPath: path,
          photoSize: size,
        });
        if (!newUser) {
          return res.json({
            success: false,
            message: "Failed to signup please try again!",
          });
        }
        res.json({
          success: true,
          message: `An OTP has been sent to ${email}`,
          email,
        });
      }
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const signup = async (req, res) => {
  const { email, otp } = req.body;
  if (!email) {
    res.json({ success: false, message: "Email not verified!" });
  }
  try {
    const temp = await TempUser.findOne({ email });
    if (!temp)
      return res.json({ success: false, message: "OTP expired or invalid! Try signingup again" });
    if (temp.otp !== otp)
      return res.json({ success: false, message: "Invalid OTP!" });
    const hashedPassword = await bcrypt.hash(temp.password, 10);
    const resp = await uploadOnCloudinary(temp.photoPath);
    const createdUser = await User.create({
      userName: temp.userName,
      uniqueName: temp.uniqueName,
      email: temp.email,
      password: hashedPassword,
      photoName: temp.photoName,
      photoPath: resp.secure_url,
      photoSize: resp.bytes,
    });
    if (createdUser) {
      await temp.deleteOne({ email });
      generateToken(createdUser, res);
      res.json({
        success: true,
        message: "User has been registered successfully!",
        userData: createdUser,
      });
    } else {
      res.json({ success: false, message: "Failed to create a new user!" });
    }
  } catch (error) {
    console.log(error.message);

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
  if (!uniqueName || !password) {
    return res.json({
      success: false,
      message: "Please fill all the details!",
    });
  }
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
          });
        }
      } catch (error) {
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

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({ sucess: false, message: "user not found!" });
    }
    res.status(200).json({ success: true, userData: user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
