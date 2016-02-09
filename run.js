/**
 * Created by francizidar on 30/01/16.
 */

var server = require('./server/server');
var database = require('./server/database');

// initialization file

function init(){

    database.connect(function(){

        server.start();

        require('./server/models');

    });

}

init();