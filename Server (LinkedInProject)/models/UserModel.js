const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Users {
  static collection() {
    return database.collection("Users");
  }

  static async createIndexes() {
    //logic check mongoDB for duplicate Username
    try {
      this.collection().createIndex({ username: 1 }, { unique: true });
      this.collection().createIndex({ email: 1 }, { unique: true });
    } catch (error) {
      console.log(`Error creating index: ${error}`);
    }
  }

  static async registerUser(newUser) {
    try {
      const result = await this.collection().insertOne(newUser);
      return result;
    } catch (error) {
      console.log(error);
    }
    // return await database.collection("Users").findOne({ _id: result.insertedId });
    // return await database.collection("users").insertOne(newUser);
    // kalo pake ini, console log result yang di register akan ngeluarin insertedId
  }
  static async findUserById(id) {
    try {
      const user = await this.collection()
        .aggregate([
          {
            $match: { _id: new ObjectId(id) },
          },
          {
            $lookup: {
              from: "Posts",
              localField: "_id",
              foreignField: "authorId", //ini ambil authorId di Post supaya nentuin
              //post milik orang yang udah login
              as: "posts",
            },
          },
        ])
        .toArray();

      // findOne({ _id: new ObjectId(id) });

      // if (!user) {
      //   throw new Error("user Not Found");
      // }

      if (!user.length) {
        throw new Error("User Not Found");
      }

      return user[0]; //tes dengan console log
    } catch (error) {
      console.log(error);
      throw new Error("Error Fetching user by id");
    }
  }
  static async findUserByEmail(email) {
    try {
      return this.collection().findOne({ email });
    } catch (error) {
      throw new Error("User Email already exist");
    }
  }

  static async findUserByUsername(username) {
    try {
      return this.collection().findOne({ username });
    } catch (error) {
      throw new Error("Username already exist");
    }
  }
}

module.exports = Users;
