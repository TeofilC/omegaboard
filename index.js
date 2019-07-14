var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3000;


state = "";
start = 0;
end = 0;

http.listen(port);

app.get('/', function(req,res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	socket.emit('replace', state, Date.now());
	socket.emit('select', start, end);
	socket.on('replace', function(txt,time) {
		state = txt;
		socket.broadcast.emit("replace", txt, time)

	});
	socket.on('select', function(startp,endp) {
		start = startp
		end = endp;
		socket.broadcast.emit("select", start, end);
	});
});
