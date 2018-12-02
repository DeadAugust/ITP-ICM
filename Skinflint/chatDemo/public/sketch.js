var socket;

var peep;
var peeps = [];

function setup() {
	createCanvas(400, 400);
	background(0,100,100);
	socket = io.connect('http://localhost:3000');
//set up with socket.id?
	peep = new Peep (socket.id, random(50, width - 50), random(50, height-50));

	var data = {
		id: peep.id,
    x: peep.x,
    y: peep.y
  };

	socket.emit('start', data);

	socket.on('heartbeat',
		function(data){
			//console.log(data);
			peeps = data;
		}
	);
}

function draw() {
	for (var i = peeps.length - 1; i >= 0; i--){
		var id = peeps[i].id;
		//console.log(id);
		if (id !== socket.id){
			fill(255);
			ellipse(peeps[i].x, peeps[i].y, 30, 30);

			fill(0);
			textAlign(CENTER);
			textSize(18);
			text(peeps[i].id);
		}
	}
	peep.show(); //LOL
	textSize(18);
	fill(0);
	text('me', peep.x - 2, peep.y + 5);

	var data = {
		// id?
		x: peep.x,
		y: peep.y
		// s?
	};
	socket.emit('update', data);
}

function mousePressed(){
	/*
	if((mouseX >= peep.x - 40) && (mouseX <= peep.x + 40)
    && (mouseY >= peep.y - 40) && (mouseY <= peep.y + 40)){
      clearTrade();
  }
	*/
	for (var i = peeps.length - 1; i >=0; i--){ //click to send msg
		if((mouseX >= peeps[i].x - 30) && (mouseX <= peeps[i].x + 30)
			&& (mouseY >= peeps[i].y - 30) && (mouseY <= peeps[i].y + 30)){
				//clearTrade();
				//peeps[i].s = true;
				fill(255,255,0);
				ellipse(peeps[i].x, peeps[i].y, 40, 40);
				//target = true;
				console.log(peeps[i].id);
		}
	}
}

function Peep(id, x, y){
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
