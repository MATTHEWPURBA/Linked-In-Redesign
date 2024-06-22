const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Follow {
  static collection() {
    return database.collection("Follows");
  }

  static async getFollowers(userId) {
    try {
      const followers = await await this.collection()
      .aggregate([
        {
          $match:
            /**
             * query: The query in MQL.
             */
            {
              followingId: new ObjectId(userId),
            },
        },
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
              localField: "followerId",
              foreignField: "_id",
              as: "follower",
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
              path: "$follower",
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
                "follower.password": 0
              }
          }
      ])
      .toArray();
      return followers;
    } catch (error) {
      console.log(error);
      throw new Error("Error Fetching Followers");
    }
  }

  static async getFollowing(userId) {
    try {
      const following = await this.collection()
        .aggregate(
            
            [
                {
                  $match:
                    /**
                     * query: The query in MQL.
                     */
                    {
                      followerId: new ObjectId(userId)
                    }
                },
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
                      localField: "followingId",
                      foreignField: "_id",
                      as: "following"
                    }
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
                      path: "$following",
                      preserveNullAndEmptyArrays: false
                    }
                },
                {
                  $project:
                    /**
                     * specifications: The fields to
                     *   include or exclude.
                     */
                    {
                      "following.password": 0
                    }
                }
              ]
        
        
        )
        .toArray();
      return following;
    } catch (error) {
      console.log(error);
      throw new Error("Error Fetching Followers");
    }
  }

  static async addFollow(newFollow) {
    try {
      const existingFollow = await this.collection().findOne({
        followingId: new ObjectId(newFollow.followingId),
        followerId: new ObjectId(newFollow.followerId),
      });

      if (existingFollow) {
        throw new Error("You already follow this user");
      }

      const response = await this.collection().insertOne({
        ...newFollow,
        followingId: new ObjectId(newFollow.followingId),
        followerId: new ObjectId(newFollow.followerId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Error Follow User");
    }
  }
}

module.exports = Follow;
