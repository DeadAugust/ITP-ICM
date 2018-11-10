var capture;
var stepSize = 10;
var rR;
var rG;
var rB;
var frame;
// noprotect
 
function setup() { 
  createCanvas(400, 300);
  capture = createCapture(VIDEO);
  capture.size(400, 300);
  //capture.hide();
  noStroke();
  rR = random(255);
  rG = random(255);
  rB = random(255);
  //frameRate(30);
  
} 

function draw() { 
  background(0);
  //console.log(frameRate()); // y tho
  console.log(frameCount);
  capture.loadPixels();
  stepSize = floor(map(mouseX, 0, width, 5, 20));
	//frame = frameRate() % 255
  //image(capture, 0, 0);
  for (var x = 0; x < capture.width; x += stepSize) {
    for (var y = 0; y < capture.height; y += stepSize) {
      var index = ((y * capture.width) + x) * 4;
      var redVal = capture.pixels[index];
      var greenVal = capture.pixels[index + 1];
      var blueVal = capture.pixels[index + 2];
      var b = redVal/255;
      fill(rR, rG, frame);
      ellipse(x, y, stepSize, stepSize * b);
    }
  }
}