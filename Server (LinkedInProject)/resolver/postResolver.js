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

      // newPost yang sebelah args dan dibawah nya udah beda, yang atas nampung dari args newPost
      // newPost yang bawah adalah data baru yang bisa di return
      try {
        const response = await Post.addPost(newPost);
        newPost._id = response.insertedId; //gaperlu ini karena di Post Schema nya udah dikasih id
        /** ketika ada add data baru, maka harus update cache
         *  maka harus dilakukan metode "invalidate cache"
         *  yaitu hapus aja cache nya yang sudah dibuat di awal
         *  agar pas getAll itu ambil baru lagi dari MongoDb
         */
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
      // Logic untuk cache
      // 1. kita akan ambil dari cache -> hanya menyimpan string
      const books = await redis.get("posts");
      if (books) {
        // jika udah ada isi dari 'posts' maka yang diambil
        // untuk di return untuk bisa di JSON.Parse adalah variabel
        // yang sudah diisi dari get 'posts'
        return JSON.parse(books);
      }
      try {
        // 2. kalo ga ada di parse, maka akan di ambil dahulu data nya
        // dari mongoDB
        const posts = await Post.collection()
          .aggregate([
            {
              $lookup:
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                {
                  from: "Users",
                  localField: "authorId",
                  foreignField: "_id",
                  as: "author",
                },
            },
            {
              $unwind:
                /**
                 * path: Path to the array field.
                 * includeArrayIndex: Optional name for index.
                 * preserveNullAndEmptyArrays: Optional
                 *   toggle to unwind null and empty values.
                 */
                {
                  path: "$author",
                  preserveNullAndEmptyArrays: false,
                },
            },
            {
              $project:
                /**
                 * specifications: The fields to
                 *   include or exclude.
                 */
                {
                  "author.password": 0,
                },
            },
          ])
          .toArray();
        // 3. cara simpen ke redis adalah dengan set ('nama simpenan',"value")
        await redis.set("posts", JSON.stringify(posts));
        // 4. response dengan hasil dari mongoDB, karena kalo udah di simpan di cache,
        // maka dia gaperlu ambil dari mongoDB lagi
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
