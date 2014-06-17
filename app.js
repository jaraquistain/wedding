/////////////////
//Dependencies
/////////////////
var express = require('express'),
    path = require('path'),
    logfmt = require('logfmt'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    http = require('http'),
    uriUtil = require('mongodb-uri');

var app = express();

/////////////////
//Database
/////////////////
var Mongoose = require('mongoose'),
    mongodbUri = 'mongodb://heroku_app26380125:8jc4bd7pobooh6egackrcfpb2m@ds061767.mongolab.com:61767/heroku_app26380125',
    mongooseUri = uriUtil.formatMongoose(mongodbUri),
    //'mongodb://localhost/wedding'
    db = Mongoose.createConnection('mongodb://localhost/wedding');

var GuestSchema = require('./dbmodels/Guest.js').GuestSchema;
var InviteSchema = require('./dbmodels/Invite.js').InviteSchema;
var Guest = db.model('guests', GuestSchema);
var Invite = db.model('invites', InviteSchema);

/////////////////
//View Engine
/////////////////
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/////////////////
//Environment
/////////////////
app.set('port', process.env.PORT || 5000);
app.use(logfmt.requestLogger());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));



/////////////////
//Routes
/////////////////
var routes = require('./routes'),
    user = require('./routes/user'),
    inviteRoutes = require('./routes/invites');

app.get('/invites', inviteRoutes.view(Invite, Guest));
app.post('/invites.json', inviteRoutes.addInvite(Invite));

app.get('/', routes.index(Guest));
app.get('/users', user.list);
app.get('/guests.json', routes.get(Guest));

app.post('/guests.json', routes.addGuest(Guest));

app.put('/guests/:id.json', routes.update(Guest));



/////////////////
//Error Handlers
/////////////////

//404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Dev
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error:   err
        });
    });
}

//Prod
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error:   {}
    });
});

/////////////////
//Connection
/////////////////
//var port = Number(process.env.PORT || 5000);
//app.listen(port, function () {
//    console.log("Listening on " + port);
//});
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;