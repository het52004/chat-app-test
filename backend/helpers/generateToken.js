import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "chatapp";

const generateToken = (user, res) => {
  const payload = {
    id: user._id,
    uniqueName: user.uniqueName,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};

export { generateToken };
