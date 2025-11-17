
//utils/generateToken.js

import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    sameSite: "none", // CHANGED: Allow cross-site cookies
    secure: true,     // CHANGED: Always true for production
    domain: ".onrender.com" // ADDED: Shared domain for subdomains
  });

  return token;
};

export default generateToken;
