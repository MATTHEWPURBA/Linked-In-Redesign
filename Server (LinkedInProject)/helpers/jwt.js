require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const signToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Example expiry time
};

function verifyToken(token,secret) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid Token");
  }
}

module.exports = {
  signToken,
  verifyToken,
};
