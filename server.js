require('newrelic');
var express  = require('express');
var cors     = require('cors');
var app      = express();
app.user(cors());
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(session({ secret: 'senhasuperincrivelmentesecreta' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/routes.js')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('A magia acontece na porta ' + port);
