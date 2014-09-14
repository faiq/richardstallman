var express = require('express')
  , logger = require('morgan')
  , bodyParser = require('body-parser') 
  , path = require('path')
  , http = require('http')
  , app = express()
  , server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(logger('dev'))
app.set('views', './views')
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){ 
  res.sendfile('./views/index.html')
});

server.listen(3000, function(){
  console.log('listening on *:3000');
}); 
