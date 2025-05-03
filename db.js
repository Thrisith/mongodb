// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

//let database;

async function getDatabase() {
  // const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  // database = client.db("library");
  // if (!database) {
  //   console.log("Database Not Connected");
  // }
  // return database;
  mongoose
    .connect(
      "mongodb+srv://Thrisith:Test%40123@cluster0.xbqfxun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("Database Connected");
    })
    .catch((e) => {
      console.log("Database Connection Failed", e);
    });
}
module.exports = {
  getDatabase,
  //ObjectId,
};
