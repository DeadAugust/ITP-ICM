//var socket;
var socket = io(); // I think this is what did it

var atman;
var atmans = [];

var bgColor;
//- - - - - player setup
var input, submit, redSlide, greenSlide, blueSlide, colorChoose, startButt;
var name = ' ';
var redCol = 0;
var greenCol = 0;
var blueCol = 0;
var shapeYes = true; //no shapes yet
var colorYes = false;
var nameYes = false;
var joined = false;

function setup() {
	//- - - - - overall
	var canvas = createCanvas(400, 600);
 	canvas.parent('myCanvas');
	bgColor = color(0, 150, 50); //should have same bg I guess
	background(bgColor);
	textAlign(CENTER);

	// - - - - -  player start screen
	textSize(30);
	fill(0);
	text('Choose Your Color', width/2, height/12);
	redSlide = createSlider(0,255,40);
	redSlide.position(width/3, 3 * height/7 - height/20);
	greenSlide = createSlider(0,255,255);
	greenSlide.position(width/3, 3 * height/7);
	blueSlide = createSlider(0,255,188);
	blueSlide.position(width/3, 3 * height/7 + height/20);
	colorChoose = createButton('I want to be this color!')
	colorChoose.parent('myCanvas'); //need?
	colorChoose.position(width/3, 4 * height/7);
	colorChoose.mousePressed(colorPush);
	text('Enter Your Name', width/2, 8 * height/12);
	input = createInput('type name here');
	input.parent('myCanvas');
	input.position(width/4, 5 * height / 7);
	submit = createButton('submit name');
	submit.parent('myCanvas');
	submit.position(3* width/4, 5 * height / 7);
	submit.mousePressed(playerName);


	// - - - - - heartbeat
	if(joined){
		socket.on('heartbeat',
			function(data){
				atmans = data;
			}
		);
	}
}

function draw() {
	if (!joined){ //- - - - - - during setup
		if (shapeYes && colorYes && nameYes){
			if (!startButt){
				hideDom();
				startButt = createButton('START');
				startButt.parent('myCanvas');
				startButt.position(width/3, height/3);
			}
			background(155);
			fill(0);
			textSize(24);
			text('click START to join game', width/2, height/4);
			startButt.mousePressed(newPlayer);
		}
		else{
			fill(redSlide.value(), greenSlide.value(), blueSlide.value());
			ellipse(width/2, height/5, height/6, height/6);
			text(name, width/2, height/4 + 80);
			textSize(20);
			fill(redSlide.value(), 0, 0);
			text('red', width/4, 3 * height/7 - height/20);
			fill(0, greenSlide.value(), 0);
			text('green', width/4, 3 * height/7);
			fill(0, 0, blueSlide.value());
			text('blue', width/4, 3 * height/7 + height/20);
		}
	}
	else{ //- - - - - after setup
		startButt.hide();
		background(bgColor);
		for (var i = atmans.length - 1; i >= 0; i--){
			var id = atmans[i].id;
			if (id !== socket.id){
				fill(255);
				ellipse(atmans[i].x, atmans[i].y, 30, 30);

				fill(0);
				textSize(18);
				text(atmans[i].id, atmans[i].x, atmans[i].y);
			}
		}
		atman.show();
		textSize(18);
		fill(0);
		noStroke();
		text('me', atman.x, atman.y + 5);

		var data = {
			x: atman.x,
			y: atman.y
		};
		socket.emit('update', data);
		socket.on('msg',
			function (data){
				console.log('msg from: ' + data.idFrom);
			}
		);
	}
}

function mousePressed(){ //can i make mousePressed an Atman method thing?
	/*
	if((mouseX >= atman.x - 40) && (mouseX <= atman.x + 40)
    && (mouseY >= atman.y - 40) && (mouseY <= atman.y + 40)){
      clearTrade();
  }
	*/
	for (var i = atmans.length - 1; i >=0; i--){ //click to send msg
		if((mouseX >= atmans[i].x - 30) && (mouseX <= atmans[i].x + 30)
			&& (mouseY >= atmans[i].y - 30) && (mouseY <= atmans[i].y + 30)){
				//clearTrade();
				//atmans[i].s = true;
				fill(255,255,0);
				ellipse(atmans[i].x, atmans[i].y, 40, 40);
				//target = true;
				console.log(atmans[i].id);
				var data = {
					idTo: atmans[i].id,
					idFrom: socket.id
				}
				socket.emit('msg', data);
		}
	}
}


function playerName(){
	if (name !== 'me' && name !== 'Me' && name !== 'type name here'){
		name = input.value();
		nameYes = true;
	}
	else{
		input.value('please type a different name');
	}

}

function colorPush(){
	redCol = redSlide.value();
	greenCol = greenSlide.value();
	blueCol = blueSlide.value();
	colorYes = true;
	fill(redCol, greenCol, blueCol);
	text('Nice Color!', 5* width/6, 4 * height/7);
}

function hideDom(){ //all but start
	input.hide();
	submit.hide();
	redSlide.hide();
	greenSlide.hide();
	blueSlide.hide();
	colorChoose.hide();
}

function newPlayer(){
	atman = new Atman (socket.id, random(50, width - 50), random(50, height-50),
	 name, redCol, greenCol, blueCol);

	var data = {
		id: atman.id,
		x: atman.x,
		y: atman.y,
		name: atman.name,
		col: atman.col
	};

	socket.emit('start', data);
	joined = true;
	startButt.hide();
}

function Atman(id, x, y, name, r, g, b){
  this.id = id;
	this.x = x;
  this.y = y;
	this.name = name;
	this.col = color(r, g, b);
	this.select = false;

  this.show = function(){
		if (this.select){
			stroke(255,255,0);
			strokeWeight(6);
		}
		else{
			stroke(0);
			strokeWeight(3);
		}
    fill(this.col);
    ellipse(this.x, this.y, 40, 40);
  }
}
