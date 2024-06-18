const typeDefs = `#graphql
 type User {
    _id: ID
    name:String
    username:String
    email:String
    password:String
  }

  type Query {
    findUsers:[User]
    findUserById(id:ID!):User
}


  type Mutation {
    register(registerUser:Register):User
  }

  input Register{
    username:String!
    email:String!
    password:String!
    name:String
}

`;




module.exports = typeDefs;
