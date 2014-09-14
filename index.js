var express = require('express')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , path = require('path')
  , http = require('http')
  , app = express()
  , twitterA = require('node-twitter-api') 
  , twitter = new twitterA({
    consumerKey: 'RR1DhG4BzaZXbo5Zs2ZAJ4omV',
    consumerSecret: '2cR9Hi24oddtg9WvC8nKJ9WWdt4T89KjspeakxvY5g2NSOMd4k',
    callback: 'http://richardstallman.me/post'
  })
  , requestTokenG = null 
  , requestTokenSecretG = null
  , server = http.createServer(app);

app.use(logger('dev'));
app.set('views', './views');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) console.log("Error getting OAuth request token : " + error);
    else {
      requestTokenG = requestToken; 
      requestTokenSecretG = requestTokenSecret; 
    }
});


app.get('/', function (req, res){ 
  res.sendfile('./views/index.html');
});

app.get('/post', function(req, res){ 
  res.sendfile('./views/post-stat.html');
}); 
server.listen(4006, function(){
  console.log('listening on *:4006');
});
