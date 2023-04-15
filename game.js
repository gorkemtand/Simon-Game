var gamePatern = [];

var userClickedPatern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

$(document).keydown(function(){
    if(!started){
        $("#level-title").html("Level " + level);
        nextSequence(); 
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    userClickedPatern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPatern.length-1);
    //console.log(userClickedPatern);
});

function nextSequence(){

    userClickedPatern = [];
    level++;

    $("#level-title").html("Level " + level);
 
    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];

    gamePatern.push(randomChosenColour);
    
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function checkAnswer(currentLevel){
    if(gamePatern[currentLevel] === userClickedPatern[currentLevel]){
        console.log("Success");
        
        if(gamePatern.length === userClickedPatern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("Wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    started = false;
    level = 0;
    gamePatern = [];
    userClickedPatern = [];
}

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}








