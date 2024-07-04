const Post = require("../models/PostModel");
const redis = require("../config/redis");

const resolvers = {
  Mutation: {
    addPost: async (parent, args, contextValue) => {
      const auth = contextValue.authentication();
      const { _id, content, tags, imgUrl } = args.newPost;
      const newPost = {
        _id,
        content,
        tags,
        imgUrl,
        authorId: auth._id,
        comments: [],
        likes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        const response = await Post.addPost(newPost);
        newPost._id = response.insertedId; // You mentioned this line is unnecessary due to the schema
        await redis.del("posts");
        return newPost;
      } catch (error) {
        console.log(error);
        throw new Error("error create post");
      }
    },
  },
  Query: {
    findAllPost: async () => {
      const books = await redis.get("posts");
      if (books) {
        return JSON.parse(books);
      }
      try {
        const posts = await Post.collection()
          .aggregate([
            {
              $lookup: {
                from: "Users",
                localField: "authorId",
                foreignField: "_id",
                as: "author",
              },
            },
            {
              $unwind: {
                path: "$author",
                preserveNullAndEmptyArrays: false,
              },
            },
            {
              $project: {
                "author.password": 0,
              },
            },
          ])
          .toArray();
        await redis.set("posts", JSON.stringify(posts));
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
