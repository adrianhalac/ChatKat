var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let date = require('date-and-time');

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index.html');
});

let usersTotal = 0;
let userColors = {};

io.on('connection', function(socket) {
    usersTotal += 1;
    console.log('A user has connected');
    io.emit('user on', {totalUsers: usersTotal});
    socket.on('chat message', function(msgObj){
        let now = new Date();
        let timeToSend = date.format(now, 'hh:mm A');
        let cssToSend = 'style="border-color: ' +  userColors[msgObj.socketId] + ';"';
        let senderObject = {message: msgObj.msg, timer: timeToSend, styleString: cssToSend};
        io.emit('chat message', senderObject);
    });
    socket.on('newUserColor', function(data){
        let socketId = data;
        let r = (Math.floor(Math.random() * 256));
        let g = (Math.floor(Math.random() * 256));
        let b = (Math.floor(Math.random() * 256));
        let rgbString = "rgb(" + r + ", " + g + ", " + b + ")";
        userColors[socketId] = rgbString;
    });
    socket.on('disconnect', function() {
        usersTotal -= 1;
        console.log('A user has disconnected');
        io.emit('user off', {totalUsers: usersTotal});
    });
});

http.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("ChatKat server is up!");
});