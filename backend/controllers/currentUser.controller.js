import { generateToken } from "../helpers/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
  try {
    const { userName, uniqueName, email, password } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId).select("password");
    if (!user) {
      res.clearCookie("jwt");
      return res.json({
        success: false,
        message: "Such user does not exist! Please login again",
      });
    } else {
      try {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          res.json({
            success: false,
            message:
              "Enter correct password in order to update your account details!",
          });
        } else {
          const otherUsersWithSameInfo = await User.find({
            _id: { $ne: userId },
            $or: [{ uniqueName: uniqueName }, { email: email }],
          });
          otherUsersWithSameInfo.forEach((user) => {
            if (user.uniqueName === uniqueName) {
              return res.json({
                success: false,
                message:
                  "The uniqueName you entered already exists! try another uniqueName",
              });
            }
            if (user.email === email) {
              return res.json({
                success: false,
                message:
                  "The email you entered already exists! try another email",
              });
            }
          });
          try {
            const updatedUser = await User.findByIdAndUpdate(
              userId,
              {
                userName,
                uniqueName,
                email,
              },
              { new: true }
            );
            const token = generateToken(updatedUser);
            updatedUser.save();
            return res.json({
              success: true,
              message:
                "The user details has been updated successfully! Please login again",
              userData: updatedUser,
              accessToken: token,
            });
          } catch (error) {
            return res.json({
              success: false,
              message: "An error occured while updating your profile!",
            });
          }
        }
      } catch (error) {
        return res.json({
          success: false,
          message:
            "An error has been occured while comparing your data please try again!",
        });
      }
    }
  } catch (error) {
    return res.json({
      success: false,
      message:
        "An error has been occured while updating your data please try again!",
    });
  }
};

export const deleteCurrentUser = async (req, res) => {
  const userId = req.userId;
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
