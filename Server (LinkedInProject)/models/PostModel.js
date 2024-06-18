const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Post {
  static collection() {
    return database.collection("Posts");
  }
  static async addPost(newPost) {
    try {
      const response = await this.collection().insertOne(newPost);
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
