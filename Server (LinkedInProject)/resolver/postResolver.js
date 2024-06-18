const Post = require("../models/PostModel");

const resolvers = {
    Mutation: {
      addPost: async (parent, args) => {
        const { content, tags, imgUrl, authorId, comments, likes } = args.newPost;
        const newPost = {
          content,
          tags,
          imgUrl,
          authorId,
          comments,
          likes,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        try {
          const response = await Post.addPost(newPost);
          console.log(response, "ini response");
          newPost._id = response.insertedId;
          return newPost;
        } catch (error) {
          console.log(error);
          throw new Error("error create post");
        }
      },
    },
    Query: {
      findAllPost: async () => {
        try {
          const posts = await Post.collection().find().toArray();
          return posts;
        } catch (error) {
          console.log(error);
          throw new Error("error fetching posts");
        }
      },
      findPostById: async (parent, args) => {
        const { id } = args;
        const post = await Post.findPostById(id);
        return post;
      },
    },
  };

  
  module.exports = resolvers;
