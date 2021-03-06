// Petal Slider Sketch
// by Raaziq Masud and August Luhrs
// heavy help from Dan Shiffman's code videos:
// https://www.youtube.com/watch?v=fBqaA7zRO58&index=26&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA
// https://github.com/CodingTrain/website/blob/master/Tutorials/P5JS/p5.js/07/7.3_p5js_Arrays_of_Objects/sketch.js

let r;
let g;
let b;

let colors = [];
let petals = [];
let centers = [];
let bubbles = [];

let win = false;

//sliders
let bugX;
let bugY;
let bugW;
let bugH;
let birdX;
let birdY;
let birdW;
let birdH;
let cloudX1;
let cloudY1;
let cloudW1;
let cloudH1;
let cloudX2;
let cloudY2;
let cloudW2;
let cloudH2;
let cloudX3;
let cloudY3;
let cloudW3;
let cloudH3;





function setup() {

  if (windowWidth <= windowHeight) {
    createCanvas(windowWidth, windowWidth);
  } else {
    createCanvas(windowHeight, windowHeight);
  }
  //color setting
  r = random(255, 255, 0)
  g = random(11, 150)
  b = random(151, 255)
  colors[0] = random(200, 255);
  colors[1] = random(50, 150);
  colors[2] = random(25, 50);
  colors[3] = random(100, 200);
  colors[4] = random(150, 230);

  //slider start positions
  bugX = width / 8;
  bugY = height * 0.075;
  bugW = width / 20;
  bugL = height * 0.075;
  birdX = width / 2;
  birdY = height / 5;
  birdW = width * 0.075;
  birdL = height / 20;
  cloudX1 = width / 2;
  cloudY1 = height * 0.075;
  cloudW1 = width / 8;
  cloudH1 = height / 10;
  cloudX2 = width * 0.6;
  cloudY2 = height * 0.075;
  cloudW2 = width * 0.15;
  cloudH2 = height * 0.175;
  cloudX3 = width * 0.675;
  cloudY3 = height * 0.075;
  cloudW3 = width / 8;
  cloudH3 = height / 10;

  //x, y of petals, left, middle, right
  let petalData = [width / 8, (3 * height / 8), //circle 1L topmiddle
    width * 0.225, (2 * height * 0.225), //circle 2L topleft
    width / 40, (2 * height * 0.225), //circle 3L topright
    width / 8, height * 0.625, //circle 4L bottommiddle
    width * 0.225, height * 0.55, //circle 5L bottomright
    width / 40, height * 0.55, //circle 6L bottomleft
    width / 2, (3 * height / 8), //circle 1M topmiddle
    width * 0.6, height * 0.45, //circle 2M topleft
    width * 0.4, height * 0.45, //circle 3M topright
    width / 2, height * 0.625, //circle 4M bottommiddle
    width * 0.6, height * 0.55, //circle 5M bottomright
    width * 0.4, height * 0.55, //circle 6M bottomleft
    width * 0.875, (3 * height / 8), //circle 1R topmiddle
    width * 0.975, height * 0.45, //circle 2R topleft
    width * 0.775, height * 0.45, //circle 3R topright
    width * 0.875, height * 0.625, //circle 4R bottommiddle
    width * 0.975, height * 0.55, //circle 5R bottomright
    width * 0.775, height * 0.55, //circle 6R bottomleft
  ];

  //x, y of centers
  let centerData = [width / 8, height / 2, //left
    width / 2, height / 2, //middle
    width * 0.875, height / 2 //right
  ];

  //petal objects
  for (let i = 0; i < 18; i++) {
    var iX = i * 2;
    var iY = i * 2 + 1;
    let p = new Petal(random(width), random(height),
      random(colors), random(colors), random(colors),
      petalData[iX], petalData[iY]);
    petals.push(p);
  }
  //center objects
  for (let i = 0; i < 3; i++) {
    var iX = i * 2;
    var iY = i * 2 + 1;
    let c = new Center(random(width), random(height),
      random(colors), random(colors), random(colors),
      centerData[iX], centerData[iY]);
    centers.push(c);
  }
  for (let i = 0; i < width; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(width / 40, width / 8);
    let a = 100;
    let b = new Bubble(x, y, r, a);
    bubbles.push(b);
  }
}

function draw() {
  if (win){
    background(200, 1);
    textSize(30);
    fill(255);
    text("you win!!", width/2, height/2);
  }
  else{
    background(g, b, r);
    //left stem
    strokeWeight(20)
    stroke(b, g, r)
    line(width / 8, height * 0.375, width / 8, height)
    //middle stem
    stroke(r, g, g)
    line(width / 2, height / 2, width / 2, height)
    //right stem
    stroke(b, g, g)
    line(width * 0.875, height * 0.375, width * 0.875, height)
    strokeWeight(1);
    //update petals
    for (let petal of petals) {
      petal.show();
    }
    //update centers
    for (let center of centers) {
      center.show();
    }
    //update haze
    for (let bubble of bubbles) {
      bubble.move();
      bubble.show();
    }
    //sliders last so they show through the chaos
    fill(0, 100, 50);
    rect(bugX, bugY, bugW, bugL);
    fill(255,255,255);
    text("bug", bugX + width/200, bugY + width/20);
    fill(70, 0, 0);
    rect(birdX, birdY, birdW, birdL);
    fill(255,255,255);
    text("bird", birdX + width/50, birdY + width/35);
    fill(10, 10, 80);
    ellipse(cloudX1, cloudY1, cloudW1, cloudH1);
    ellipse(cloudX2, cloudY2, cloudW2, cloudH2);
    ellipse(cloudX3, cloudY3, cloudW3, cloudH3);
    fill(255,255,255);
    text("cloud", cloudX2, cloudY2);
    noFill(); //???

    if ((bubbles[0].a < 10)&&
        ((petals[0].x <= petals[0].endX+1)&&(petals[0].x >= petals[0].endX-1))
        && ((petals[0].y <= petals[0].endY+2)&&(petals[0].y >= petals[0].endY-2))){
      win = true;
    }
    //debug
    // console.log(petals[2]);
    // console.log(centers[2]);
  }
  //console.log(win);
}

function mouseDragged() { //would it be worth it to use dist()?
  if ((mouseX >= bugX - bugW && mouseX <= bugX + bugW) &&
    (mouseY >= bugY - bugL && mouseY <= bugY + bugL)) {
    //bugY = map(mouseY, height, 0, 200, 0);
    bugY = constrain(mouseY, 0, height);
    /*if (bugY > height ){
    bugY = height - 30;
    }
    else {
    	 
      bugY = map(mouseY, 0, height, 0, height - 30);
    }*/
    for (let petal of petals) {
      petal.move();
    }
    for (let center of centers) {
      center.move();
    }
    //petals.this.x = mouseX; how to make this work?
  } else if ((mouseX >= birdX - birdW && mouseX <= birdX + birdW) &&
    (mouseY >= birdY - birdL && mouseY <= birdY + birdL)) {
    birdX = constrain(mouseX, 0, width);
    for (let petal of petals) {
      petal.move();
    }
    for (let center of centers) {
      center.move();
    }
  } else if ((mouseX >= cloudX1 - cloudW1 && mouseX <= cloudX3 + cloudW3) &&
    (mouseY >= cloudY2 - cloudH2 && mouseY <= cloudY2 + cloudH2)) {
    cloudX1 = mouseX - width / 10;
    cloudX2 = mouseX;
    cloudX3 = mouseX + (3 * width / 40);
    for (let bubble of bubbles) {
      bubble.a = map(mouseX, 0, width, 0, 100);
    }
  }
  //how to make this not choppy? oh! get rid of console.log
  //how to make upper and lower bounds of bug?
  //how to prevent objects from jumping around as soon as 
  //button is pressed?
  //other sliders: sun (changes position of other sliders)
}

class Petal {
  constructor(_x, _y, _cR, _cG, _cB, _eX, _eY) {
    this.x = _x;
    this.startX = _x;
    this.y = _y;
    this.startY = _y;
    this.cR = _cR;
    this.cG = _cG;
    this.cB = _cB;
    this.endX = _eX;
    this.endY = _eY;
  }
  show() {
    noStroke();
    fill(this.cR, this.cG, this.cB);
    ellipse(this.x, this.y, width / 8);
  }
  move() {
    this.x = map(birdX, width / 4, width, this.endX, this.startX);
    this.y = map(bugY, (3 * height / 4), 0, this.endY, this.startY);
  }
}

class Center {
  constructor(_x, _y, _cR, _cG, _cB, _eX, _eY) {
    this.x = _x;
    this.startX = _x;
    this.y = _y;
    this.startY = _y;
    this.cR = _cR;
    this.cG = _cG;
    this.cB = _cB;
    this.endX = _eX;
    this.endY = _eY;
  }
  show() {
    noStroke();
    fill(this.cR, this.cG, this.cB);
    ellipse(this.x, this.y, width / 4);
  }
  move() {
    this.x = map(birdX, width / 4, width, this.endX, this.startX);
    this.y = map(bugY, (3 * height / 4), 0, this.endY, this.startY);
  }
}

class Bubble {
  constructor(_x, _y, _r, _a) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.a = _a;
  }

  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }

  show() {
    noStroke();
    fill(10, 10, 20, this.a);
    ellipse(this.x, this.y, this.r * 2);
  }
}