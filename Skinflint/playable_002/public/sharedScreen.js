// var socket = io('/sharedScreen');
var socket = io();

var startButton;
var atmans = [];
//- - - - - - - - map
var mapTiles = [];
// var mapNames = [];

//- - - - - - - timer
var startTime = false; //timer on/off
var timeLimit = 80000; //test timer
// var timeLimit = 120000; //two mins per round
var timer; //millis tracker
var clock; //countdown display
var clockMin;
var clockSec;

// - - - - - fud ranking
var badTatos = false;
var badMorks = false;
var badUpples = false;
var goodTatos = false;
var goodMorks = false;
var goodUpples = false;


//- - - - - - - - - final scores
var finalScores = false;
var atmanRanks = [];
var hLine; //score spacing

function setup(){
  createCanvas(windowWidth-100,windowHeight-100);
  textAlign(CENTER);
  textSize(height/10);
  background(0,150,50);
  startButton = createButton('start Game');
  startButton.mousePressed(startGame);

  //map
var tile0 = new Tile(0, height/4, width/3, height/4, 255, 204, 255);//light pink top left
mapTiles.push(tile0);
var tile1 = new Tile(width/3, height/4, width/3, height/4, 255, 255, 102); //light yellow top middle
mapTiles.push(tile1);
var tile2 = new Tile(2 * width/3, height/4, width/3, height/4, 204, 153, 255); //light purple top right
mapTiles.push(tile2);
var tile3 = new Tile(0, 2 * height/4, width/3, height/4, 204, 136, 0);//light brown middle left
mapTiles.push(tile3);
var tile4 = new Tile(width/3, 2 * height/4, width/3, height/4, 0, 230, 0);//light green middle middle
mapTiles.push(tile4);
var tile5 = new Tile(2* width/3, 2 * height/4, width/3, height/4, 204, 204, 204);//light grey middle right
mapTiles.push(tile5);
var tile6 = new Tile(0, 3 * height/4, width/3, height/4, 255, 153, 128);//light red bottom left
mapTiles.push(tile6);
var tile7 = new Tile(width/3, 3 * height/4, width/3, height/4, 255, 179, 102);//light orange bottom middle
mapTiles.push(tile7);
var tile8 = new Tile(2* width/3, 3 * height/4, width/3, height/4, 102, 204, 255);//light blue bottom right
mapTiles.push(tile8);

socket.emit('startMap', mapTiles);

  socket.on('heartbeat',
    function(data){
      atmans = data.atmans;
      // console.log(atmans);
      console.log(mapTiles);
      for(var i = 0; i < mapTiles.length; i++){
        mapTiles[i].names = 0;
      }
      for(var j = atmans.length -1; j >= 0; j--){
        var location = atmans[j].tile;
        // mapTiles[location].names.push(data.atmans[j].name);
        mapTiles[location].names++;
      }
    }
  );
}


function draw (){
  // background(20, 200, 100); //sandbox start where all avatars are?
  if(finalScores){
    // textSize(height/10);
    background(51, 204, 51);
    // strokeWeight(4);
    // stroke(255);
    // fill(0);
    // text("0:00", 5 * width/6, height/7);
    noStroke();
    fill(0, 102, 153);
    textSize(height/8);
    text('FINAL SCORES:', width/2, height/8);
    textSize(height/(8 + atmanRanks.length));
    hLine = (height-100)/(atmanRanks.length + 1);
    for(var i = 0; i < atmanRanks.length; i++){
      var place = i +1;
      text(place + ". " + atmanRanks[i].name + ": " + atmanRanks[i].pts, width/2, ((i+1) * hLine) + 100);
    }

  }
  else if(startTime){
    //map

    textSize(height/10);
    background(0,150,50);
    rectMode(CORNER);
    for (var i = 0; i < mapTiles.length; i++){
      mapTiles[i].show();
      mapTiles[i].nameCount = 1;
      for (var j = atmans.length -1; j >= 0; j--){
        if(atmans[j].tile == i){
          console.log('daidfidfidf');
          fill(atmans[j].r, atmans[j].g, atmans[j].b);
          mapTiles[i].gps(atmans[j].name);
        }
      }
    }
    //fud Status
    var fudBlack;
    var fudGold;
    if(badTatos){
      fudBlack = 5* width/36;
    }
    if(badMorks){
      fudBlack = 13 * width/36;
    }
    if(badUpples){
      fudBlack = 7 * width/12;
    }
    if(goodTatos){
      fudGold = 5 * width/36;
    }
    if(goodMorks){
      fudGold = 13 * width/36;
    }
    if(goodUpples){
      fudGold = 7 * width/12;
    }
    textSize(height/12);
    rectMode(CENTER);
    noStroke();
    fill(0);
    rect(fudBlack, height/7, width/4, height/7);
    strokeWeight(5);
    stroke(255, 219, 77);//gold
    noFill();
    rect(fudGold, height/7, width/4, height/7);
    noStroke();
    fill(255, 153, 0)//orange tatos
    text('TATOS', 5 * width/36, height/6);
    fill(0, 51, 153); //dark blue mork
    text('MORK', 13 * width/36, height/6);
    fill(179, 0, 89); //fuschia? upple
    text('UPPLES', 7 * width/12, height/6);
    // timer
    socket.emit('rankCheck?', socket.id);
    clock = int(((timeLimit + timer) - millis()) / 1000);
    clockMin = int(clock / 60);
    clockSec = int(clock % 60);
    textSize(height/10);
    strokeWeight(4);
    stroke(0);
    fill(255);
    if (clockSec < 10){
      text(clockMin + ":0" + clockSec, 5 * width/6, height/7);
    }
    else text(clockMin + ":" + clockSec, 5 * width/6, height/7);
    if(millis() - timer >= timeLimit){
      socket.emit('gameOver');
      console.log('game over');
      // finalScores = true;
    }

    //player locations
    // for(var i = 0; i < mapTiles.length; i++){
    //
    // }

    socket.on('rankCheck',
      function(data){
        // console.log(data.tRank, data.mRank, data.uRank);
        if(data.tRank == -1){
          badTatos = true;
          badMorks = false;
          badUpples = false;
          // console.log('Tato Rank: bad');
        }
        if(data.mRank == -1){
          badTatos = false;
          badMorks = true;
          badUpples = false;
          // console.log('Mork Rank: bad');
        }
        if(data.uRank == -1){
          badTatos = false;
          badMorks = false;
          badUpples = true;
          // console.log('Upple Rank: bad');
        }
        if(data.tRank == 2){
          goodTatos = true;
          goodMorks = false;
          goodUpples = false;
        }
        if(data.mRank == 2){
          goodTatos = false;
          goodMorks = true;
          goodUpples = false;
        }
        if(data.uRank == 2){
          goodTatos = false;
          goodMorks = false;
          goodUpples = true;
        }
        // console.log('rankkkkkk');
      }
    );

    socket.on('finalScores',
      function(data){
        atmanRanks = data;
        finalScores = true;
      })
  }
}

function startGame(){
  socket.emit('startGame');
  console.log('sent');
  startTime = true;
  timer = millis();
}

function Atman(id, x, y, name, r, g, b){
  this.id = id;
  this.x = x;
  this.y = y;
  this.name = name;
  this.r = r;
  this.g = g;
  this.b = b;
  this.t;
  this.m;
  this.u;
}

function Tile(x,y,w,h,r,g,b){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.r = r;
  this.g = g;
  this.b = b;
  this.names = 0;
  this.nameCount;

  this.show = function(){
    strokeWeight(1);
    stroke(0);
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.w, this.h);
  }

  this.gps = function(atmanName){
    noStroke();
    text(atmanName, this.x + (this.w /2), this.y + ((this.h/(this.names + 1)) * this.nameCount));
    this.nameCount++;
  }
}
