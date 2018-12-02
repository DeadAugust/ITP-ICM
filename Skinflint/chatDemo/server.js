var peeps = [];

function Peep(id, x, y){
  this.id = id;
  this.x = x;
  this.y = y;
}


var express = require('express');
var app = express();

var server = app.listen(3000);

app.use(express.static('public'));

console.log('Socket server running');

var io = require('socket.io')(server);

//heartbeat needed?
setInterval(heartbeat, 33);
function heartbeat(){ //so this is the only thing sent from server???
  io.sockets.emit('heartbeat', peeps);
}

io.sockets.on('connection',
  function(socket){
    console.log("new peep: " + socket.id);
    socket.on('start',
      function(data){
        var peep = new Peep(socket.id, data.x, data.y);
        peeps.push(peep);
      }
    );

    socket.on('update', //x undefined error from being first to party?
      function(data){
        //console.log(peeps.length);
        if (peeps.length >= 2){ //so only starts if at least 2 players?
          var peep;
          for (var i = 0; i < peeps.length; i++){
            if (socket.id == peeps[i].id){
              peep = peeps[i];
            }
          }
          // peep.x = data.x;
          // peep.y = data.y
        }
      }
    );

    socket.on('msg',
      function(data){
        socket.broadcast.to(data.id).emit('msg', data);
      }
    );

    socket.on('disconnect',
      function(data){
        console.log("Client has disconnected");
      })
  })
