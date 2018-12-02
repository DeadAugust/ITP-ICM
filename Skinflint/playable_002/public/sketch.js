//var socket;
var socket = io(); // I think this is what did it

var atman;
var atmans = [];

function setup() {
	createCanvas(400, 400);
	background(0,100,100);


	atman = new Atman (socket.id, random(50, width - 50), random(50, height-50));

	var data = {
		id: atman.id,
    x: atman.x,
    y: atman.y
  };

	socket.emit('start', data);

	socket.on('heartbeat',
		function(data){
			atmans = data;
		}
	);
}

function draw() {
	for (var i = atmans.length - 1; i >= 0; i--){
		var id = atmans[i].id;
		if (id !== socket.id){
			fill(255);
			ellipse(atmans[i].x, atmans[i].y, 30, 30);

			fill(0);
			textAlign(CENTER);
			textSize(18);
			text(atmans[i].id, atmans[i].x, atmans[i].y);
		}
	}
	atman.show();
	textSize(18);
	fill(0);
	text('me', atman.x - 2, atman.y + 5);

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

function mousePressed(){
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

function Atman(id, x, y){
  this.id = id;
	this.x = x;
  this.y = y;
  // this.s = false; //if selected

  this.show = function(){
    fill(0, 20, 255);
    ellipse(this.x, this.y, 40, 40);
  }

  //this.inventory
  //this.trade
}
