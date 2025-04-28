const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
});

const bookModel = mongoose.model("book", bookSchema);

module.exports = bookModel;
