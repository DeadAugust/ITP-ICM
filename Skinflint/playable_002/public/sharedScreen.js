console.log('test');
var socket = io();

var testButton;

//timer
var startTime = false; //timer on/off
var timeLimit = 15000; //test timer
// var timeLimit = 120000; //two mins per round
var timer; //millis tracker
var clock; //countdown display
var clockMin;
var clockSec;
// var stopTest = false;

//final scores
var finalScores = false;

function setup(){
  createCanvas(500,500);
  textAlign(CENTER);
  testButton = createButton('start Game');
  testButton.mousePressed(startGame);
}


function draw (){
  background(20, 200, 100);
  ellipse(50,50,50,50);
  if(finalScores){
    ellipse(100, 50, 50, 50);
    text("0:00", 4 * width/5, height/5);

  }
  else if(startTime){
    // var c;
    clock = int(((timeLimit + timer) - millis()) / 1000);
    clockMin = int(clock / 60);
    clockSec = int(clock % 60);
    noStroke();
    fill(0);
    textSize(24);
    if (clockSec < 10){
      text(clockMin + ":0" + clockSec, 4 * width/5, height/5);
    }
    else text(clockMin + ":" + clockSec, 4 * width/5, height/5);

    if(millis() - timer >= timeLimit){
      socket.emit('gameOver');
      console.log('game over');
      finalScores = true;

    }
    // console.log(millis());
  }
}

function startGame(){
  socket.emit('startGame');
  console.log('sent');
  startTime = true;
  timer = millis();
}
