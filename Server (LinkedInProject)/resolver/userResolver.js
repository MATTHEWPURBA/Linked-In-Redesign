const Users = require("../models/UserModel");

const resolvers = {
    Mutation: {
      register: async (parent, args) => {
        const { username, email, password, name } = args.registerUser;
        const newUser = { username, email, password, name };
        const result = await Users.registerUser(newUser);
        return newUser;
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
