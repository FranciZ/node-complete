/**
 * Created by francizidar on 30/01/16.
 */

var server      = require('./server/server');
var database    = require('./server/database');
var resources   = require('./server/resources');

// initialization file

function init(){

    database.connect(function(){

        resources.initModels();

        server.start();

    });

}

init();