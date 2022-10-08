// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String

});

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({
name: "Apple",
rating: 8,
review: "Sweet fruit"
});

// fruit);

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit:fruitSchema
});



const Person = mongoose.model('Person', personSchema);

// const jhon = new Person({
//   name: "John",
//   age: 32
// });


// Person.deleteOne({name: "Amy"}, function(err){
//   mongoose.connection.close();
//   if(err)
//   {
//
//     console.log(err);
//   }
//   else{
//     console.log("successfully deleted all the names");
//   }
// })
// jhon.save();

const mango = new Fruit({
  name: "Mango",
  rating: 7,
  review: "Awesome fruit"
});

const grave = new Fruit({
  name: "Grave",
  rating: 9,
  review: "Sour fruit"
});

const pineApple = new Fruit({
  name: "Pine Apple",
  rating: 7,
  review: "Awesome fruit"
});


const orange = new Fruit({
  name: "orange",
  rating: 8,
  review:"orange review"
});
// orange.save();
const amy = new Person({
  name: "Amy",
  age: 20,
  favouriteFruit: orange
});



Fruit.find({name: "Mango"}, function(err, mango){

  if(err)
  {
    console.log(err);
  }

  else{
    console.log(mango[0]);

  Person.updateOne({name: "John"},{favouriteFruit: mango[0]}, function(err){
    mongoose.connection.close();
    if(err){
      console.log(err);
    }
    else{
      console.log("Updated successfully");
    }
  });
}
});




// amy.save();
//orange.save();
// Fruit.deleteOne({_id: "61276aff2e5bb71208ac06ec"},function(err){
//   mongoose.connection.close();
//   if(err)
//   {
//     console.log(err);
//   }
//   else{
//     console.log("successfully deleted");
//   }
// })


/*Fruit.find(function(err, fruits){
  if(err)
  {
    console.log(err);
  }
  else{
    fruits.forEach(function(fruit){
        console.log(fruit.name);
    });
    mongoose.connection.close();
  }
});*/
