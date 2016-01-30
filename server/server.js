/**
 * Created by francizidar on 30/01/16.
 */

var express = require('express');
var app = express(); // returns the instance of express app/server

var PORT = process.env.PORT || 3000;

exports.start = function(){

    app.get('/', function(req, res){

        res.send('Hello world');

    });

    app.listen(PORT, function(){

        console.log('Server running port '+PORT);

    });

};

exports.stop = function(){



};
