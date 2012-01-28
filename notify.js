var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app);


app.use(express.bodyParser());
app.listen(13002);

var connections = {}

/********** express.js routes ************/
app.get('/', function (req, res) {
  res.send(404);
});

app.post('/message/:action/:to', function (req, res) {
  target = connections[req.params.to]    
  if (target) {
    connections[req.params.to].emit(req.params.action, req.body);
    res.send(200);
  }
  else
    res.send(404);
});

/********** socket.io work ***************/
io.sockets.on('connection', function(socket) {
  socket.on('username', function(username) {
    connections[username] = socket;
  });

});


