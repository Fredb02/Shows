var express = require('express');
var config = require('config');
var bodyParser = require('body-parser');
var tediousExpress = require('express4-tedious');

var app = express();


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Request-Method', '*');
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    //res.setHeader('Access-Control-Allow-Headers', '*');
    req.sql = tediousExpress(config.get('connection'));
    next();
});

app.use(bodyParser.text()); 
app.use('/shows', require('./routes/shows'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);
    err.status = 404;
    next(err);
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
