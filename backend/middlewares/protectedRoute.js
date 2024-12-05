import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json({
      success: false,
      message: "Access Denied! No Token provided please login again",
    });
  }
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken) {
      res.json({ success: false, message: "Token invalid, login again!" });
    } else {
      const user = await User.findById(verifiedToken?.id);
      if (!user) {
        res.json({ success: false, message: "User not found!" });
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Access Denied! Token provided is not valid please login again",
    });
  }
};

export default protectedRoute;
