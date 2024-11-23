import jwt from "jsonwebtoken";

const protectedRoute = async (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.json({
      success: false,
      message: "Access Denied! No Token provided please login again",
    });
  }
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifiedToken) {
      req.userId = verifiedToken.id;
      next();
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Access Denied! Token provided is not valid please login again",
    });
  }
};

export default protectedRoute;
