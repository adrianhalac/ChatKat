var express = require('express');
var app = express();
var http = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index.html');
});



app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("ChatKat server is up!");
});