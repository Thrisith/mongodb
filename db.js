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
    .connect("mongodb://127.0.0.1:27017/library")
    .then(() => {
      console.log("Database Connected");
    })
    .catch(() => {
      console.log("Database Connection Failed");
    });
}
module.exports = {
  getDatabase,
  //ObjectId,
};
