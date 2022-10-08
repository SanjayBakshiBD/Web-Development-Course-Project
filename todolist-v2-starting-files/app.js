//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const date = require(__dirname + "/date.js");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/todolistDB');
}

const itemsSchema = new mongoose.Schema({
  name: String
});

// const Kitten = mongoose.model('Kitten', kittySchema);

const Item = mongoose.model('Item', itemsSchema);

// const silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'

const task1 = new Item({ name: 'eating'});
const task2 = new Item({ name: 'sleeping'});
const task3 = new Item({ name: 'walking'});

const arr = [task1, task2, task3];
Item.insertMany(arr, function(err, docs){
  if(err)
  {
    console.log("could not be inserted");
  }
  else
  {
    console.log("inserted successfully");
  }
});


app.get("/", function(req, res) {

  res.render("list", {listTitle: "Today", newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
