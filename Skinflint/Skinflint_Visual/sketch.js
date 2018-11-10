let map1;
let axe;
let trees;
let water;
let demo;
let sun;

function preload(){
  map1 = loadImage('map.png');
  sun = loadImage('sun.png');
}

function setup() {
  createCanvas(400, 500);
  background(240);
  fill(50,150,0);
	rect(0, 0, width/2, 3 * height/4);
  fill(200);
  rect(width/2, height/2 +25, width/2, height/4);
  fill(70);
  rect(0, 3*height/4, width, height/4);
  image(map1, width/2,-30);
  image(sun, width/2, height/2 + 25);
  textSize(16);
  fill(0);
  text('You enter the clearing.', 10, 40);
  text('No one else is here.', 10, 60);
  text('You see a forest of  trees ,', 10, 100);
  text('a rusty  axe , and a muddy', 10, 120);
  text('pool of  water .', 10, 140);
  strokeWeight(2);
  noFill();
  rect(146, 87, 45, 15);
  rect(61, 108, 35, 15);
  rect(63, 127, 45, 15);
  //text input as buttons
  demo = 0;
  // text('lighter');
  fill(190);
  rect(width/20 + 5, 5 * height/6, 100, 50);
  rect(width/3 + 15, 5 * height/6, 100, 50);
  rect(2* width/3 + 5, 5 * height/6, 100, 50);
  fill(0);
  
  text('Character', width/20 + 17, 5 * height/6 + 30);
  text('Inventory', width/3 + 30, 5 * height/6 + 30);
  text('Settings', 2*width/3 + 26, 5 * height/6 + 30);
  
}

function draw() {
}

function mousePressed(){
  // console.log(mouseX, mouseY);
  demo++;
  if (demo == 1){
    text('The trees are black with', 10, 170);
    text('char. Dead, but might be', 10, 190);
    text('good firewood.', 10, 210);
  }
  else if (demo == 2){
    text('You pick up the axe.', 10, 240);    
  }
  else if (demo == 3) {
    text('You start chopping away.', 10, 270);
  }
  
}