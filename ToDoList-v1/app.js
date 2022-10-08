const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
var _ = require('lodash');
const app = express();
// mongoose.connect('mongodb://localhost:27017/todolistDB', {
//   useNewUrlParser: true
// });
let task = "";
//const allTasks = ["Task1", "Task2"];
//const workTasks = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));


const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [itemsSchema]
});

const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model('List', listSchema);

const item1 = new Item({
  name: "Task1"
});
const item2 = new Item({
  name: "Task2"
});

const item3 = new Item({
  name: "Task3"
});

const array = [item1, item2, item3];

// app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems) {
    if (err) {
      console.log(err);
    } else if (foundItems.length == 0) {
      Item.insertMany(array, function(error) {
        if (error) {
          console.log(err);
        } else {
          console.log("Inserted Successfully");
        }
      });
      res.redirect("/");
      res.end();
    } else {
      let day = date.getEnglishDate();
      res.render("list", {
        title: "Today",
        allItems: foundItems
      });
      res.end();
      //console.log(foundItems);
    }
  })

});

app.get('/favicon.ico', function(req, res) {
    res.status(204);
    res.end();
});


app.get("/:listName", function(req, res) {
  const newListName = _.capitalize(req.params.listName);
  console.log(newListName);
  List.findOne({ name: newListName}, function(err, foundList) {
      if (err)
      {
        console.log("Second List Error " + err);
      }
       else
       {
          if (!foundList)
          {
            console.log("Did not found");
            const newList = new List({
                name: newListName,
                items: array
              });
              newList.save();
              res.redirect("/" + newListName);
              res.end();
            }
            else
            {
              console.log("Found List");
              res.render('list',{
                title: foundList.name,
                allItems: foundList.items
              });
              res.end();
            }
          }
      });
  });




app.get("/about", function(req, res) {
  res.render('about');
})

app.post("/", function(req, res) {
  task = req.body.newTask;
  const listName = req.body.listType;
  const newTask = new Item({
    name: task
  });

  if(listName === "Today")
  {
      newTask.save();
      res.redirect("/");
  }

  else
  {
    List.findOne({name: listName}, function(err, foundList){
      if(!err)
      {
        foundList.items.push(newTask);
        foundList.save();
        res.redirect("/" + listName);
      }
    });
  }



});

app.post('/delete', function(req, res) {
  const itemToDeleteId = req.body.itemToDelete;
  const nameOfTheList = req.body.listName;
  if(nameOfTheList === "Today"){
    Item.findByIdAndRemove(itemToDeleteId, function(err) {
      if (!err) {
        console.log("Successfully Deleted");
      }
    });
    res.redirect("/");
  }
  else{
    const filter = {name: nameOfTheList};
    const update = {$pull: {items: {_id: itemToDeleteId}}};

    List.findOneAndUpdate(filter, update, function(err, foundList){
      if(!err)
      {
        console.log("Successfully Deleted");
        res.redirect("/" + nameOfTheList);
      }
      else{
        console.log("Could not delete");
      }
    });
  }


})



app.listen(3000, function() {
  console.log("Server is open on port 3000");
});
