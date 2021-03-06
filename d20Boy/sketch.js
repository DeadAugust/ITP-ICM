//d20 simulator by August Luhrs
// 9/12/18 for ITP ICM class

var d;

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  //createCanvas(400, 400);
  d = 0;
}

function draw() {
  var w = width;
  var h = height;
  textSize(w / 12);
  background(155);
  icosa();
  if (d == 0) {
    background(155);
    icosa();
    fill(255, 255, 255);
    text("click me to roll a d20!", w / 8, h / 6, w, h)
  } else if (d == 1) {
    background(255, 0, 0);
    icosa();
    fill(255, 0, 0);
    oneDigit();
    fill(255);
    textSize(w / 6);
    text("FUCK", w / 2 - 9 * (w / 40), h / 7, w, h)
  } else if (d == 2) {
    background(255, 50, 0);
    icosa();
    fill(255, 50, 0);
    oneDigit();
  } else if (d == 3) {
    background(255, 100, 0);
    icosa();
    fill(255, 100, 0);
    oneDigit();
  } else if (d == 4) {
    background(255, 175, 0);
    icosa();
    fill(255, 175, 0);
    oneDigit();
  } else if (d == 5) {
    background(255, 200, 0);
    icosa();
    fill(255, 200, 0);
    oneDigit();
  } else if (d == 6) {
    background(255, 225, 0);
    icosa();
    fill(255, 225, 0);
    oneDigit();
  } else if (d == 6) {
    background(255, 255, 0);
    icosa();
    fill(255, 255, 0);
    oneDigit();
  } else if (d == 7) {
    background(175, 255, 0);
    icosa();
    fill(175, 255, 0);
    oneDigit();
  } else if (d == 8) {
    background(100, 255, 0);
    icosa();
    fill(100, 255, 0);
    oneDigit();
  } else if (d == 9) {
    background(0, 255, 0);
    icosa();
    fill(0, 255, 0);
    oneDigit();
  } else if (d == 10) {
    background(0, 255, 75);
    icosa();
    fill(0, 255, 75);
    twoDigit();
  } else if (d == 11) {
    background(0, 255, 150);
    icosa();
    fill(0, 255, 150);
    twoDigit();
  } else if (d == 12) {
    background(0, 255, 255);
    icosa();
    fill(0, 255, 255);
    twoDigit();
  } else if (d == 13) {
    background(0, 175, 255);
    icosa();
    fill(0, 175, 255);
    twoDigit();
  } else if (d == 14) {
    background(0, 100, 255);
    icosa();
    fill(0, 100, 255);
    twoDigit();
  } else if (d == 15) {
    background(0, 0, 255);
    icosa();
    fill(0, 0, 255);
    twoDigit();
  } else if (d == 16) {
    background(90, 0, 255);
    icosa();
    fill(90, 0, 255);
    twoDigit();
  } else if (d == 17) {
    background(150, 0, 255);
    icosa();
    fill(150, 0, 255);
    twoDigit();
  } else if (d == 18) {
    background(200, 0, 255);
    icosa();
    fill(200, 0, 255);
    twoDigit();
  } else if (d == 19) {
    background(255, 0, 255);
    icosa();
    fill(255, 0, 255);
    twoDigit();
  } else if (d == 20) {
    background(255, 255, 255);
    icosa20();
    fill(0);
    stroke(255);
    twoDigit();
    textSize(w / 6);
    text("NICE", w / 2 - w / 5, h / 7, w, h)
  }
}

/*function mouseReleased() {
  //d = 20;
  d = floor(random() * 20 + 1);
}
*/

function mousePressed() {
  d = floor(random() * 20 + 1);
}

function twoDigit() {
  var w = width;
  var h = height;
  text(d, w / 2 - w / 20, h / 2 - h / 50, w / 10, h / 10);
}

function oneDigit() {
  var w = width;
  var h = height;
  text(d, w / 2 - w / 40, h / 2 - h / 50, w / 10, h / 10);
}

function icosa() { //d20shape
  var w = width;
  var h = height;
  stroke(255);
  strokeWeight(1);
  fill(0);
  triangle( //center 0
    (w / 2 - w / 10), (h / 2 + h / 10),
    (w / 2 + w / 10), (h / 2 + h / 10),
    (w / 2), (h / 2 - h / 10));
  triangle( // 2nd layer 1 (NE)
    (w / 2 + w / 10), (h / 2 + h / 10),
    (w / 2 + 4 * (w / 30)), (h / 2 - 3 * (h / 100)),
    (w / 2), (h / 2 - h / 10)
  );
  triangle( // 2nd layer 2 (S)
    (w / 2 - w / 10), (h / 2 + h / 10),
    (w / 2 + w / 10), (h / 2 + h / 10),
    (w / 2), (h / 2 + h / 5)
  );
  triangle( // 2nd layer 3 (NW)
    (w / 2), (h / 2 - h / 10),
    (w / 2 - w / 10), (h / 2 + h / 10),
    (w / 2 - 4 * (w / 30)), (h / 2 - 3 * (h / 100))
  );
  triangle( // 3rd layer 4 (NNE)
    (w / 2), (h / 2 - h / 10),
    (w / 2), (h / 2 - 4 * (h / 30)),
    (w / 2 + 4 * (w / 30)), (h / 2 - 3 * (h / 100))
  );
  triangle( // 3rd layer 5 (E)
    (w / 2 + w / 10), (h / 2 + h / 10),
    (w / 2 + 4 * (w / 30)), (h / 2 - 3 * (h / 100)),
    (w / 2 + 4 * (w / 30)), (h / 2 + 6 * (h / 50))
  );
  triangle( // 3rd layer 6 (SE)
    (w / 2 + w / 10), (h / 2 + h / 10),
    (w / 2), (h / 2 + h / 5),
    (w / 2 + 4 * (w / 30)), (h / 2 + 6 * (h / 50))
  );
  triangle( // 3rd layer 7 (SW)
    (w / 2 - w / 10), (h / 2 + h / 10),
    (w / 2), (h / 2 + h / 5),
    (w / 2 - 4 * (w / 30)), (h / 2 + 6 * (h / 50))
  );
  triangle( // 3rd layer 8 (W)
    (w / 2 - w / 10), (h / 2 + h / 10),
    (w / 2 - 4 * (w / 30)), (h / 2 - 3 * (h / 100)),
    (w / 2 - 4 * (w / 30)), (h / 2 + 6 * (h / 50))
  );
  triangle( // 3rd layer 9 (NNW)
    (w / 2), (h / 2 - h / 10),
    (w / 2), (h / 2 - 4 * (h / 30)),
    (w / 2 - 4 * (w / 30)), (h / 2 - 3 * (h / 100))
  );
  fill(255);
  triangle( //mouth
    (w / 2 - w / 20), (h / 2 + 5 * (h / 40)),
    (w / 2 + w / 20), (h / 2 + 5 * (h / 40)),
    (w / 2), (h / 2 + 4 * (h / 25))
  );
  ellipse( //left eye
    (w / 2 - 6 * (w / 70)), (h / 2 - h / 100), w / 20, h / 20
  );
  fill(0, 155, 155);
  ellipse( //left pupil
    (w / 2 - 6 * (w / 70)), (h / 2 - h / 100), w / 40, h / 40
  );
  fill(255);
  ellipse( //right eye
    (w / 2 + 6 * (w / 70)), (h / 2 - h / 100), w / 20, h / 20
  );
  fill(0, 155, 155);
  ellipse( //right pupil
    (w / 2 + 6 * (w / 70)), (h / 2 - h / 100), w / 40, h / 40
  );
  /*
	ellipse( //right bicep
    (w/2 + w/5), (h/2 + h/14), w/6, w/20
  );
  ellipse( //right forearm
  	(w/2 + w/4), (h/2 + h/25), w/25, w/7
  );
  ellipse( //left bicep
    (w/2 - w/5), (h/2 + h/14), w/6, w/20
  );
  */
}

function icosa20() { //d20shape rainbow
  var w = width;
  var h = height;
  stroke(0);
  strokeWeight(1);
  fill(255, 0, 255);
  triangle( //center 0
    (w / 2 - w / 10), (h / 2 + h / 10),
    (w / 2 + w / 10), (h / 2 + h / 10),
    (w / 2), (h / 2 - h / 10));
  fill(255, 0, 0);
  triangle( // 2nd layer 1 (NE)
    (w / 2 + w / 10), (h / 2 + h / 10),
    (w / 2 + 4 * (w / 30)), (h / 2 - 3 * (h / 100)),
    (w / 2), (h / 2 - h / 10)
  );
  fill(255, 100, 0);
  triangle( // 2nd layer 2 (S)
    (w / 2 - w / 10), (h / 2 + h / 10),
    (w / 2 + w / 10), (h / 2 + h / 10),
    (w / 2), (h / 2 + h / 5)
  );
  fill(255, 255, 0);
  triangle( // 2nd layer 3 (NW)
    (w / 2), (h / 2 - h / 10),
    (w / 2 - w / 10), (h / 2 + h / 10),
    (w / 2 - 4 * (w / 30)), (h / 2 - 3 * (h / 100))
  );
  fill(100, 255, 0);
  triangle( // 3rd layer 4 (NNE)
    (w / 2), (h / 2 - h / 10),
    (w / 2), (h / 2 - 4 * (h / 30)),
    (w / 2 + 4 * (w / 30)), (h / 2 - 3 * (h / 100))
  );
  fill(0, 255, 0);
  triangle( // 3rd layer 5 (E)
    (w / 2 + w / 10), (h / 2 + h / 10),
    (w / 2 + 4 * (w / 30)), (h / 2 - 3 * (h / 100)),
    (w / 2 + 4 * (w / 30)), (h / 2 + 6 * (h / 50))
  );
  fill(0, 255, 100);
  triangle( // 3rd layer 6 (SE)
    (w / 2 + w / 10), (h / 2 + h / 10),
    (w / 2), (h / 2 + h / 5),
    (w / 2 + 4 * (w / 30)), (h / 2 + 6 * (h / 50))
  );
  fill(0, 255, 255);
  triangle( // 3rd layer 7 (SW)
    (w / 2 - w / 10), (h / 2 + h / 10),
    (w / 2), (h / 2 + h / 5),
    (w / 2 - 4 * (w / 30)), (h / 2 + 6 * (h / 50))
  );
  fill(0, 150, 255);
  triangle( // 3rd layer 8 (W)
    (w / 2 - w / 10), (h / 2 + h / 10),
    (w / 2 - 4 * (w / 30)), (h / 2 - 3 * (h / 100)),
    (w / 2 - 4 * (w / 30)), (h / 2 + 6 * (h / 50))
  );
  fill(0, 0, 255);
  triangle( // 3rd layer 9 (NNW)
    (w / 2), (h / 2 - h / 10),
    (w / 2), (h / 2 - 4 * (h / 30)),
    (w / 2 - 4 * (w / 30)), (h / 2 - 3 * (h / 100))
  );
  fill(255);
  triangle( //mouth
    (w / 2 - w / 20), (h / 2 + 5 * (h / 40)),
    (w / 2 + w / 20), (h / 2 + 5 * (h / 40)),
    (w / 2), (h / 2 + 4 * (h / 25))
  );
  ellipse( //left eye
    (w / 2 - 6 * (w / 70)), (h / 2 - h / 100), w / 20, h / 20
  );
  fill(0, 155, 155);
  ellipse( //left pupil
    (w / 2 - 6 * (w / 70)), (h / 2 - h / 100), w / 40, h / 40
  );
  fill(255);
  ellipse( //right eye
    (w / 2 + 6 * (w / 70)), (h / 2 - h / 100), w / 20, h / 20
  );
  fill(0, 155, 155);
  ellipse( //right pupil
    (w / 2 + 6 * (w / 70)), (h / 2 - h / 100), w / 40, h / 40
  );
}