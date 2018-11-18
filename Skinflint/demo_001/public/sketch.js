var socket;

function setup() {
  createCanvas(windowHeight, windowHeight);
  background(0, 200, 50);

  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);

}

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

function draw() {
}
