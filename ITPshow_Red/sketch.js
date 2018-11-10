// CMYK Halftone Portrait Morph
// by August Luhrs Oct. 2018
// photos by Arne Svenson
// with lots of help from Dan Shiffman
// built off template from webcam sketch from CCFestLA '17
// RGB --> CMYK formula derived after much head-ache from: 
// http://www.easyrgb.com/en/math.php and
// https://www.rapidtables.com/convert/color/rgb-to-cmyk.html and
// https://github.com/ertdfgcvb/CMYK/blob/master/cmyk/cmyk.pde
let CKdots = [];
let Ydots = [];
let Mdots = [];
let stepSize = 15; //dot density

let img; 
let a = 175; //alpha
let w = 330; //width of base image
let h = 420; //height of base image
let w2 = 428; //width of rotated image
let h2 = 492; //height of rotated image

function preload() {
  img = loadImage('RedBurns_close.png');
}

function setup() {
  createCanvas(1275, 1820);
  angleMode(DEGREES);
  background(255);
  noStroke();
  img.loadPixels();


  //Y load
  for (let x = 0; x < width; x += stepSize) {
    for (let y = 0; y < height; y += stepSize) {
      //let xY = int(map(x, -w / 2, w / 2, 0, w));
      //let yY = int(map(y, -h / 2, h / 2, 0, h));

      let index = ((y * img.width) + x) * 4;
      let R = img.pixels[index];
      let G = img.pixels[index + 1];
      let B = img.pixels[index + 2];

      //RGB --> CMYK
      let C = 1 - (R / 255);
      let M = 1 - (G / 255);
      let Y = 1 - (B / 255);
      let K = 1;
      if (C < K) {
        K = C;
      }
      if (M < K) {
        K = M;
      }
      if (Y < K) {
        K = Y;
      }
      C = (C - K) / (1 - K);
      M = (M - K) / (1 - K);
      Y = (Y - K) / (1 - K);

      //yellow
      let dotY = new dot(x, y, stepSize * Y, 255, 255, 0);
      Ydots.push(dotY);
      //cyan
      let dotC = new dot(x, y, stepSize * C, 0, 255, 255);
      CKdots.push(dotC);
      //black
      let dotK = new dot(x + stepSize / 2, y + stepSize / 2, stepSize * K , 0, 0, 0);
      CKdots.push(dotK);
      //magenta
      let dotM = new dot(x, y, stepSize * M, 255, 0, 255);
      Mdots.push(dotM);
    }
  }
  push();
  rotate(-345);
  for (let CKd of CKdots) {
    CKd.show();
  }
  pop();
  push();
  rotate(-15);
  //translate(0,150);
  for (let Md of Mdots) {
    Md.show();
  }
  pop();
  push();
  //translate(0,50);
  for (let Yd of Ydots) {
    Yd.show();
  }
  pop();
}

function draw() {}

class dot {
  constructor(_x, _y, _r, _R, _G, _B) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.R = _R;
    this.G = _G;
    this.B = _B;
  }
  show() {
    fill(this.R, this.G, this.B, a);
    ellipse(this.x, this.y, this.r);
  }
  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }
}
