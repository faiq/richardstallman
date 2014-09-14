var express = require('express')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , path = require('path')
  , util = require('util') 
  , http = require('http')
  , app = express()
  , twitterA = require('node-twitter-api')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , rms = require('./quotes.js')
  , twitter = new twitterA({
    consumerKey: 'RR1DhG4BzaZXbo5Zs2ZAJ4omV',
    consumerSecret: '2cR9Hi24oddtg9WvC8nKJ9WWdt4T89KjspeakxvY5g2NSOMd4k',
    callback: 'http://samshreds.com:4006/tweet'
  })
  , server = http.createServer(app);

app.use(logger('dev'));
app.set('views', './views');
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({secret: 'blah'}))



app.get('/', function (req, res){
  twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) console.log("Error getting OAuth request token : " + error);
    else {
      req.session.requestToken = requestToken;
      req.session.requestTokenSecret = requestTokenSecret;
      res.render('index');
    }
  });
});

app.get('/login', function (req, res){
  res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + req.session.requestToken);
});

app.get('/tweet', function(req, res){
  console.log(util.inspect(req.params, false, null));
  req.session.oauthToken = req.params.oauth_token; 
  req.session.oauth_verifier = req.params.oauth_verifier;
  res.render('post-stat',{quotes: rms});
});

app.post('/post', function (req, res){ 
  twitter.statuses("update", {
        status: "Hello world!"
    },
    req.session.accessToken,
    req.session.accessTokenSecret,
    function(error, data, response) {
        if (error) {
            // something went wrong
            console.log('fail') 
        } else {
          console.log('suxess')
        }
    }
);    
});

server.listen(4006, function(){
  console.log('listening on *:4006');
});
