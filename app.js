var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index.html');
});

io.on('connection', function(socket) {
    console.log('A user has connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + msg)
    });
    socket.on('disconnect', function() {
        console.log('A user has disconnected');
    });
});

http.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("ChatKat server is up!");
});