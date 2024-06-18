const typeDefs = `#graphql
 type Post{
    _id: ID
    content:String
    tags:[String]
    imgUrl:String
    authorId:String
    comments:[Comments]
    likes: [Likes]
    createdAt:String
    updatedAt:String
  }

  type Comments{
    content:String
    username:String
    createdAt:String
    updatedAt:String
  }

  type Likes{
    username:String
    createdAt:String
    updatedAt:String
  }

  type Follow{
    _id: ID
    followingId:ID
    followerId:ID
    createdAt:String
    updatedAt:String
  }

  type Query {
    findAllPost:[Post]
    findPostById(id:ID):Post
  }


  type Mutation {
    addPost(newPost:NewPost):Post
  }


  input CommentInput{
  content:String
      username:String
  }


  input LikeInput{
    username:String
  }

  input NewPost{
    content:String
    tags:[String]
    imgUrl:String
    authorId:ID
    comments:[CommentInput]
    likes: [LikeInput]
  }

`;



module.exports = typeDefs;
