// Import required modules
const { MongoClient, ServerApiVersion } = require("mongodb");

// Get the MongoDB URI from environment variables
const uri = process.env.URI_MONGODB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Send a ping to confirm a successful connection
const database = client.db("LinkedIn");
console.log("Pinged your deployment. You successfully connected to MongoDB!");

module.exports = {
  database,
  client,
};
 