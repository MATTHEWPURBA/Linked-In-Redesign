const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Post {
  static collection() {
    return database.collection("Posts");
  }
  static async addPost(newPost) {
    try {
      const response = await this.collection().insertOne({
        ...newPost,
        // perbedaan newPost yang di
        // return dengan .insertOne(newPost)
        // dengan .insertOne({...newPost})
        // adalah kalo newPost yang invoke
        // udah bareng dengan _id baru
        // nah sedangkan kalo yang {...newPost}
        // harus di inject sendiri _id nya pake
        // insertedId biar pas di return
        // ada _id nya, ini terjadi karena
        // dari newPost nya sendiri pun gapunya _id
        authorId: new ObjectId(newPost.authorId),
        comments: [],
        likes: [],
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async findPostById(id) {
    try {
      const post = await this.collection().findOne({ _id: new ObjectId(id) });
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      console.log(error);
      throw new Error("Error Fetch Post By Id");
    }
  }
}
module.exports = Post;
