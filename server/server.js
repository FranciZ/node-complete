/**
 * Created by francizidar on 30/01/16.
 */

var express = require('express');
var app     = express(); // returns the instance of express app/server

var bodyParser = require('body-parser');

var serveIndex = require('serve-index');
// does the same thing as express.static() but is compatible with serveIndex
var serveStatic = require('serve-static');

var session = require('express-session');

var router = require('./router');

var PORT = process.env.PORT || 3000;

exports.start = function(){

    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());

    app.use(session({
        genid: function(req) {
            return guid(); // use UUIDs for session IDs
        },
        secret: 'lhdfs903wrodp89wfejo90qcisoj'
    }));

    app.set('view engine', 'ejs');

    app.use('/assets', serveStatic('assets'));
    app.use('/cms-dev', serveStatic('cms-dev'));
    app.use('/cms', serveStatic('cms-dist'));
    app.use('/assets', serveIndex('assets'));

    app.listen(PORT, function(){

        console.log('Server running port '+PORT);
        router(app);

    });

};

exports.stop = function(){



};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}