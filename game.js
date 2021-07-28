
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function() {
    if (started) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
    
        playSound(userChosenColour);
        animatePress(userChosenColour);
    
        checkAnswer(userClickedPattern.length-1);
    }

});

function nextSequence() {
    userClickedPattern = [];

    level += 1;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    for (let i = 0; i < gamePattern.length; i++) {
        (function(ind) {
            setTimeout(function() { 
                $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(gamePattern[i]);},
                500 + (500 * ind));
        })(i);
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function() { nextSequence() }, 800);
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() { $("body").removeClass("game-over"); }, 200);
        $("#level-title").text("Game Over! Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}