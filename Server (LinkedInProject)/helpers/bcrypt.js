const bcrypt = require("bcryptjs");

const hash = bcrypt.genSaltSync(10);

function hashPassword(password) {
  return bcrypt.hashSync(password, hash);
}

function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}
module.exports = { hashPassword, comparePassword };
