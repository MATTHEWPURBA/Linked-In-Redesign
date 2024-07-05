const typeDefs = `#graphql
 type Post{
    _id: ID
    content:String
    tags:[String]
    imgUrl:String 
    authorId:ID
    comments:[Comments]
    likes: [Likes]
    createdAt:String
    updatedAt:String
    author:AuthorDetail
  }

  type AuthorDetail{
    _id: ID
    name:String
    username:String
    email:String
    profilePicture:String
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


  type Query {
    findAllPost:[Post]
    findPostById(id:ID!):Post
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
    authorId: ID
    # disiini gaperlu diisi authorId
    # karena user gaperlu isi id nya
    # langsung diisi auto dari authentiation
  }


`;

module.exports = typeDefs;
