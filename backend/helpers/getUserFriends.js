import User from "../models/user.model.js";

export const getUserFriends = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return false;
    } else {
      return user.friends;
    }
  } catch (error) {
    return false;
  }
};
