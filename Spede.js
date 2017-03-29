var difficulty = 1;
var howmanybuttons = 3;
var doweanimate = 0;
var score = 0;
var buttonvector = [];
var gamestarted = 0;
var colorstorage = [[255,0,0],[0,255,0],[0,0,255]];
var lightstorage = [[255,200,200],[200,255,200],[200,200,255]];
var gamespeed = 2000;

function randomizebutton() {
var randombutton = Math.floor(Math.random()*howmanybuttons+1);
  return randombutton;
}

//this function initializes the game, might implement multiple game boards to initialize and the variable size later
function initializegame(howmanybuttons){

difficulty = 1;
score = 0;
$("#button1").css("background-color", "rgb(255,0,0)");
$("#button2").css("background-color", "rgb(0,255,0)");
$("#button3").css("background-color", "rgb(0,0,255)");

}


$(document).ready(function(){
    //Here a function that calls Onclick as callback is needed, proceeds through the code and returns to start after click.
    
initializegame(howmanybuttons);    

//Create a timer that changes the color of one of the buttons every other second
setInterval(function(){
	var whichbutton = randomizebutton();
	$("#button"+whichbutton).css("background-color","rgb("+lightstorage[whichbutton-1]+")");
	//save to a vector which button lighted up
	buttonvector.push(whichbutton);
	console.log(buttonvector);
	
	//Also change the button color back after a time delay
	setTimeout(function(){
	$("#button"+whichbutton).css("background-color","rgb("+colorstorage[whichbutton-1]+")");
	}, 500);
},1000);
    
$(".gamearea").on("click",".colorbutton",function(){
    
//when the game is started, call for initialization of the game
if(gamestarted < 1){
gamestarted = 1; 
console.log("Here we call maybe");  
initializegame(howmanybuttons);  
//If user clicks on the correct box    
}else if(this.id == "button"+buttonvector[0]){

	//flash button border as gold
	$("#button"+buttonvector[0]).css("border-color","rgb(255,215,0)");
	setTimeout(function(){
	var toberemoved = this.id;
	console.log("this.id is " + this.id);
	$(toberemoved).css("border-color","rgb(0,0,0)");
	},gamespeed/2);
	
	//shift removes the first element of a vector
	buttonvector.shift();	
  
	score = score + Math.floor(Math.pow(1.5,difficulty));
  
	difficulty = difficulty +1;
 

  //$(".background").css("background-color","green");

}else{
  
  if(difficulty>1){
  difficulty = difficulty-1;
  //$(".background").effect("highlight", {color: 'red'}, 3000);
  }  
  }
 
//tell user the difficulty
$(".difficultyindicator").text("Difficulty level is "+difficulty+".");
    
//show what the randomized new color is
$(".scoreindicator").text("Your score is:  "+score);

 
//this closes the click loop  
});

  
//end of (document).ready
})
