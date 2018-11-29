//Skinflint Prototype 0.0.1
//August Luhrs
//based on Coding Train examples by Dan Shiffman

var socket;

var atman;
var atmans = [];
var fud = ['tato', 'mork', 'upple'];

function setup() {
  /*
  if (windowHeight > windowWidth){
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  */
  createCanvas(400,400);
  background(0, 200, 50);
  socket = io.connect('http://localhost:3000');
  //socket.on('mouse', newDrawing);

  atman = new Atman (random(width), random(height), random(fud));

  var data = {
    x: atman.x,
    y: atman.y,
    fud: atman.fud;
  };
  socket.emit('start', data);

  socket.on('heartbeat',
    function(data){
      //console.log(data);
      atmans = data;
    }
  );
}

function draw() {
  for (var i = atmans.length - 1; i >=0; i --){
    var id = atmans[i].id;
    if (id.substring(2 id.length) !== socket.id){
      fill(random(255));
      ellipse(atmans[i].x, atmans[i].y, 30, 30);

      fill(255);
      textAlign(CENTER);
      textSize(4);
      text(atmans[i].id);
    }
  }
  atman.show();

  var data = {
    x: atman.x,
    y: atman.y,
    fud: atman.fud;
  };
  socket.emit('update', data);
}
/*
function newDrawing(data){
  noStroke();
  fill(0,50,140);
  ellipse(data.x,data.y,20,20);
}
function mouseDragged(){
  console.log('sending: ' + mouseX + mouseY);

  var data = {
    x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data);

  noStroke();
  fill(255);
  ellipse(mouseX,mouseY,20,20);
}
*/
