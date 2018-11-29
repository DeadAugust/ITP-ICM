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
  background(0, 150, 50);
  socket = io.connect('http://localhost:3000');
  //socket.on('mouse', newDrawing);

  atman = new Atman (random(width), random(height-100), random(fud),
    random(50,255), random(50,255), random(50,255));

  var data = {
    x: atman.x,
    y: atman.y,
    fud: atman.fud,
    r: atman.r,
    g: atman.g,
    b: atman.b
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
  console.log(socket.id + " " + atman.fud);
  for (var i = atmans.length - 1; i >=0; i --){
    var id = atmans[i].id;
    if (id.substring(2, id.length) !== socket.id){
      fill(atmans[i].r, atmans[i].g, atmans[i].b);
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
    fud: atman.fud,
    r: atman.r,
    g: atman.g,
    b: atman.b
  };
  socket.emit('update', data);
}


function Atman(x, y, fud, r, g, b){
  this.x = x;
  this.y = y;
  this.fud = fud;
  this.r = r;
  this.g = g;
  this.b = b;

  this.show = function(){
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, 40, 40);
  }

  //this.inventory
  //this.trade
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
