const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const { ObjectId } = require("mongodb");

async function getDatabase() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("library");
  if (!database) {
    console.log("Database Not Connected");
  }
  return database;
}
module.exports = {
  getDatabase,
  ObjectId,
};
