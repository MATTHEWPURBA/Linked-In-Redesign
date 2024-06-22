const Follow = require("../models/FollowModel");

const resolvers = {
  Query: {
    getFollowers: async (parent, args) => {
      try {
        const { userId } = args;
        const followers = await Follow.getFollowers(userId);
        return followers;
      } catch (error) {
        console.log(error);
        throw new Error("Error fetch Followers");
      }
    },
    getFollowing: async (parent, args) => {
      try {
        const { userId } = args;
        const following = await Follow.getFollowing(userId);
        return following;
      } catch (error) {
        console.log(error);
        throw new Error("Error fetch Following");
      }
    },
  },

  Mutation: {
    addFollow: async (parent, args, contextValue) => {
      const auth = contextValue.authentication();
      const newFollow = {
        followingId: args.followingId,
        followerId: auth._id,
      };
      try {
        const response = await Follow.addFollow(newFollow);
        newFollow._id = response.insertedId;
        newFollow.createdAt = new Date().toISOString();
        newFollow.updatedAt = new Date().toISOString();
        return { ...newFollow };
      } catch (error) {
        console.log(error);
        throw new Error("Error follow user");
      }
    },
  },
};

module.exports = resolvers;
