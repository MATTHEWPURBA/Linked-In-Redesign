const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const Users = require("../models/UserModel");

const resolvers = {
  Mutation: {
    register: async (parent, args) => {
      const { username, email, password, name } = args.registerUser;

      if (!username || !email) {
        throw new Error("Email/Username cant be empty");
      }

      // validation
      if (!password || password.length < 5) {
        throw new Error("Password must be at least 5 characters Long");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid Email Format");
      }

      const existedUser = await Users.findUserByEmail(email);
      if (existedUser) {
        throw new Error("Email already exist");
      }

      const hashedPassword = hashPassword(password);

      const registerUser = { username, email, password: hashedPassword, name };
      const result = await Users.registerUser(registerUser);
      const { password: _, ...userNoPass } = registerUser;
      return { ...userNoPass, _id: result.insertedId };
    },
    login: async (parent, args) => {
      const { email, password } = args;

      try {
        if (!email || !password) {
          throw new Error("Email and Password are required");
        }

        const user = await Users.findUserByEmail(email);
        if (!user) {
          throw new Error("User Not Found");
        }

        const isPasswordValid = comparePassword(password, user.password);

        if (!isPasswordValid) {
          throw new Error("invalid password");
        }

        const token = signToken({ _id: user._id, email: user.email });

        const { password: _, ...userNoPass } = user;

        return { token, email};
      } catch (error) {
        console.log(error);
      }
    },
  },
  Query: {
    findUsers: async () => {
      try {
        const users = await Users.collection().find().toArray();
        return users.map(({ password, ...user }) => user);
      } catch (error) {
        console.log(error);
        throw new Error("error fetching user");
      }
    },
    findUserById: async (
      parent,
      args /** args ini datang dari
      findByUserId(id:ID) dan merupakan input user */
    ) => {
      const { id } = args;
      const user = await Users.findUserById(id);
      const { password, ...userNoPass } = user;
      return userNoPass;
    },
  },
};

module.exports = resolvers;
