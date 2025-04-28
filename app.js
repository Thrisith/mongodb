const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const bodyparser = require("body-parser");
const dbo = require("./db");
app.engine(
  "hbs",
  exhbs.engine({
    layoutsDir: "C:/Users/tthri/OneDrive/Desktop/MongoDb/MongoFirst/views",
    defaultLayout: "main",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let message = "MongoDB CRUD Operations";
  let database = await dbo.getDatabase();
  const collection = database.collection("books");
  const cursor = collection.find({});
  let bookDetails = await cursor.toArray();
  let edit_id, edit_book;
  if (req.query.edit_id) {
    edit_id = req.query.edit_id;
    edit_book = await collection.findOne({
      _id: new dbo.ObjectId(edit_id),
    });
  }
  if (req.query.delete_id) {
    let delete_id = req.query.delete_id;
    await collection.deleteOne({
      _id: new dbo.ObjectId(delete_id),
    });
    return res.redirect("/?status=3");
  }
  let operation = "";
  switch (req.query.status) {
    case "1":
      operation = "Inserted Successfully";
      break;

    case "2":
      operation = "Updated Successfully";
      break;

    case "3":
      operation = "Deleted with your confirmation :(";
      break;

    default:
      break;
  }
  res.render("main", { message, bookDetails, edit_book, edit_id, operation });
});

app.post("/store_book", async (req, res) => {
  const database = await dbo.getDatabase();
  const collection = database.collection("books");
  let book = { title: req.body.title, author: req.body.author };
  await collection.insertOne(book);
  return res.redirect("/?status=1");
});

app.post("/update_book/:edit_id", async (req, res) => {
  const database = await dbo.getDatabase();
  const collection = database.collection("books");
  let book = { title: req.body.title, author: req.body.author };
  let edit_id = req.params.edit_id;
  await collection.updateOne(
    { _id: new dbo.ObjectId(edit_id) },
    { $set: book }
  );
  return res.redirect("/?status=2");
});

app.get("/r", (req, res) => {
  res.send("<h1>Thrisith is sending in /r</h1>");
});

app.listen(8080, () => {
  console.log("Listening Port 8080");
});
