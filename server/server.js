/**
 * Created by francizidar on 30/01/16.
 */

var express = require('express');
var app     = express(); // returns the instance of express app/server

var serveIndex = require('serve-index');
// does the same thing as express.static() but is compatible with serveIndex
var serveStatic = require('serve-static');

var router = require('./router');

var PORT = process.env.PORT || 3000;

exports.start = function(){

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
