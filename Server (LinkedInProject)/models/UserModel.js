const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Users {
  static collection() {
    return database.collection("Users");
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
      const user = await this.collection().findOne({ _id: new ObjectId(id) });
      if (!user) {
        throw new Error("user Not Found");
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error Fetching user by id");
    }
  }
  static async findUserByEmail(email) {
    try {
      return this.collection().findOne({ email });
    } catch (error) {
      throw new Error("User Email cant");
    }
  }
}

module.exports = Users;
