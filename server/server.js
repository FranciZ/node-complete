/**
 * Created by francizidar on 30/01/16.
 */

var express = require('express');
var app     = express(); // returns the instance of express app/server

var serveIndex = require('serve-index');

// does the same thing as express.static() but is compatible with serveIndex
var serveStatic = require('serve-static');

var PORT = process.env.PORT || 3000;

exports.start = function(){

    app.use('/', serveStatic('public'));
    app.use('/', serveIndex('public'));

    app.listen(PORT, function(){

        console.log('Server running port '+PORT);

    });

};

exports.stop = function(){



};
