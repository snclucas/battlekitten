// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.SERVER_PORT || 8080;
var mongoose = require('mongoose');
var flash    = require('connect-flash');

//var compression = require('compression');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var MongoStore = require('connect-mongo/es5')(session);

var server = require('http').createServer(app);

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating



// required for passport

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie : {
    maxAge: 3600000, // see below
    rolling: true,
    resave: true, 
  },
  rolling: true,
    store   : new MongoStore({
        url  : configDB.url
    })
}));

app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes/pageroutes.js')(app);
//require('./app/routes/staticroutes.js')(app);

app.use(express.static(__dirname + '/public'));


app.use(function(req, res, next){
  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
});


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
