var  userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;
var index = 0;

//This function adds colour to computer array
function nextSequence(){
    userClickedPattern = [];
   var randomNumber = Math.floor(Math.random()*4);
   var randomChosenColour = buttonColours[randomNumber];
   $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // this is for only animation and no logic
   playSound(randomChosenColour); //this line is only for sound and no game logic
   gamePattern.push(randomChosenColour);
   level = level+1;
   index = 0;
   $("#level-title").text("Level " + level);
}

// This function push users choice to users array
$(".btn").click(function(){
  if(gameStarted === true)
  {
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour); // this line is only for sound and no game logic
    animatePress(userChosenColour); // this is for only animation and no logic.
    userClickedPattern.push(userChosenColour);
    checkAnswer();
  }
});

// this function calls the start game function if not started when pressing any key
$(document).on("keypress", function(event){
  if(gameStarted === false)
  {
    startGame();
  }

  else{
    console.log("Game Statreted");
  }

});

// this function start the game.
function startGame(){
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  nextSequence();
  gameStarted = true;

}

//This function determines win or losse of the game
function checkAnswer(){
  if (userClickedPattern[index] === gamePattern[index])
  {
     index = index +1;
    if(gamePattern.length === index)
    {
      setTimeout(nextSequence,1000);

    }

  }
  else{
    lost();
  }
}

function lost()
{
  playSound("wrong");
  $("body").addClass("game-over");

  setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    gameStarted = false;

}


//This function  do not play any role in game winning or loosing.
function playSound(randomColour)
{
  if(randomColour === "blue")
  {
    var audio = new Audio("sounds/blue.mp3");
    audio.play();
  }

  else if(randomColour === "green")
  {
    var audio = new Audio("sounds/green.mp3");
    audio.play();
  }

  else if(randomColour === "red")
  {
    var audio = new Audio("sounds/red.mp3");
    audio.play();
  }


  else if(randomColour === "yellow")
  {
    var audio = new Audio("sounds/yellow.mp3");
    audio.play();
  }

  else if(randomColour === "wrong")
  {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
  }

}

//This function  do not play any role in game winning or loosing.
function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
