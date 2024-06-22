const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

require("dotenv").config();

function signToken(payload) {
  return jwt.sign(payload, secret, {
    expiresIn: "1h" /** ini fitur dari jwt */,
  });
}

function verifyToken(token) {
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
