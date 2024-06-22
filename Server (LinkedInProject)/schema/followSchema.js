const typeDefs = `#graphql

type Follow{
    _id: ID
    followingId:String
    followerId:String
    following: FollowDetail
    follower:FollowDetail
    createdAt:String
    updatedAt:String
  }

  type FollowDetail{
    _id:ID
    email:String
    username:String
  }

  type Query{
    getFollowing(userId:ID!):[Follow]
    getFollowers(userId:ID!):[Follow]
  }

  type Mutation{
    addFollow(followingId:ID!):Follow
  }

`;

module.exports = typeDefs;
