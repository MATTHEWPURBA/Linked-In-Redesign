const typeDefs = `#graphql
 type User {
    _id: ID
    name:String
    username:String
    email:String
    password:String
    profilePicture:String
    posts:[Post!]
    # Post ini terhubung ke graphQL post di file lain jadi gaperlu di definisikan ulang
  }

  type Query {
    findUsers:[User]
    findUserById(id:ID!):User
    findUserByEmail(email:String!):User
  }

  type Mutation {
    register(registerUser:Register):User
    #  jadi ni kalo Register! itu artinya bahkan si name
    #  juga harus diisin dengan value ga peduli 
    #  apakah di input Register nya si name ga terlalu diperlukan
    login(email:String!,password:String!):AuthPayLoad
  }

  input Register{
    username:String!
    email:String!
    password:String!
    name:String
  }

  type AuthPayLoad{
    token:String!
    email:String!
  }

`;

module.exports = typeDefs;
