const exp = require('express');
const app = exp();


app.get("/", function(request, response){
  // console.log(request);
  response.send("<h1>Hellow World</h1>");
});

app.get('/contact', function(req,res){
  res.send("contact me at Sbakshi3@gmail.com");
});

app.get('/about', function(req, res){
  res.send("take me at about page");
});

app.get('/hobbies', function(req, res){
  res.send("I like to play cricket");
});

app.listen(3000, function(){
  console.log("Server started");
});
