var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

//Start the game
$(document).keydown(function(){
  if (!started){
    $("#level-title").text("Level " + level);
    newSequence();
    started = true;
  }
});

//Keeping track of user press
$(".btn").click(function (){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animationPress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

//Choosing random color button
function newSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animationPress(randomChosenColor);
  playSound(randomChosenColor);
}

//Checking answers
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        newSequence();
      }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    document.querySelector("body").classList.add("game-over");
    setTimeout(function(){
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//Start game again
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

//Sound function
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animation function
function animationPress(key){
  var activeKey = document.querySelector("#" + key);
  activeKey.classList.add("pressed");
  setTimeout(function(){
    activeKey.classList.remove("pressed");
  }, 100);
}
