let difficulty = false; //easy-false, hard-true
let easyMode; //easy button
let hardMode; //hard button
let mode; //difficulty display
let modeStr = 'easy';
let count; //guess point counter
let points = 0;
let prob1; //top equation
let prob2; //bottom equation
//correct answer -- if prob1, false; if prob2, true
let answer;
let ask = true; //switches between asking and displaying feedback
let next; //next button;

function setup() {
  createCanvas(800, 600);
  background(220);
  easyMode = createButton('easy');
  easyMode.position(50, 20);
  easyMode.mousePressed(easySwitch);
  hardMode = createButton('hard');
  hardMode.position(100, 20);
  hardMode.mousePressed(hardSwitch);
  // count = createP('Points:  ' + points);
  // count.position(500, 20);
  // prob1 = createDiv();
  // prob2 = createDiv();
  answer = false;
  next = createButton('next problem');
  next.position(width / 2 , height / 2 + height/24)
  next.mousePressed(nextProblem);
  next.hide();
}

function draw() {
  if (ask) {
    background(155);
    next.hide();
    fill(0);
    textSize(24);
    text(modeStr + ' mode', 200, 40);
    text('Points: ' + points, 450, 40);
    if (mouseX >= width / 6 - width / 12 && mouseX <= width - (width / 6 - width / 12) &&
      mouseY >= height / 6 && mouseY <= height / 6 + height / 3) {
      fill(255, 100);
      strokeWeight(2);
      rect(width / 6 - width / 12, height / 6, width - (width / 6), height / 3);
      fill(0, 0);
      rect(width / 6 - width / 12, 3 * (height / 5), width - (width / 6), height / 3);
    } else if (mouseX >= width / 6 - width / 12 && mouseX <= width - (width / 6 - width / 12) &&
      mouseY >= 3 * (height / 5) && mouseY <= (3 * (height / 5)) + height / 3) {
      fill(255, 100);
      strokeWeight(2);
      rect(width / 6 - width / 12, 3 * (height / 5), width - (width / 6), height / 3);
      fill(0, 0);
      rect(width / 6 - width / 12, height / 6, width - (width / 6), height / 3);
    } else {
      fill(0, 0);
      strokeWeight(2);
      rect(width / 6 - width / 12, height / 6, width - (width / 6), height / 3);
      rect(width / 6 - width / 12, 3 * (height / 5), width - (width / 6), height / 3);
    }
  }
}

function mousePressed() {
  if (mouseX >= width / 6 - width / 12 && mouseX <= width - (width / 6 - width / 12) &&
    mouseY >= height / 6 && mouseY <= height / 6 + height / 3) {
    console.log('prob 1 click');
    if (ask) {
      ask = false;
      if (!answer) {
        fill(0, 255, 0, 155); // green
        rect(width / 6, height / 5, 4 * width / 6, 4 * height / 6);
        fill(0);
        text('correct!', width / 2 - width / 6, height / 2 + height / 12);
        points++;      
        next.show();
        // next = createButton('next problem');
        // next.position(width/2 - width/12 ,3* (height/4))
        // next.mousePressed(nextProblem);
      } else {
        fill(255, 0, 0, 155); // red
        rect(width / 6, height / 5, 4 * width / 6, 4 * height / 6);
        fill(0);
        text('try again', width / 2 - width / 6, height / 2 + height / 12);
        next.show();
      }
    }
  }
  if (mouseX >= width / 6 - width / 12 && mouseX <= width - (width / 6 - width / 12) &&
    mouseY >= 3 * (height / 5) && mouseY <= (3 * (height / 5)) + height / 3) {
    console.log('prob 2 click');
    if (ask) {
      ask = false;
      if (answer) {
        fill(0, 255, 0, 155); // green
        rect(width / 6, height / 5, 4 * width / 6, 4 * height / 6);
        fill(0);
        text('correct!', width / 2 - width / 6, height / 2 + height / 12);
        points++;      
        next.show();
        // next = createButton('next problem');
        // next.position(width/2 - width/12 ,3* (height/4))
        // next.mousePressed(nextProblem);
      } else {
        fill(255, 0, 0, 155); // red
        rect(width / 6, height / 5, 4 * width / 6, 4 * height / 6);
        fill(0);
        text('try again', width / 2 - width / 6, height / 2 + height / 12);
        next.show();
      } 
    }
  }
}

function easySwitch() {
  difficulty = false;
  modeStr = 'easy';
}

function hardSwitch() {
  difficulty = true;
  modeStr = 'hard';
}

function nextProblem() {
  ask = true;
  console.log('next');
  reset();
}

function reset(){
  
}
  