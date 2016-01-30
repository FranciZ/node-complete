/**
 * Created by francizidar on 30/01/16.
 */

var mongoose = require('mongoose');

exports.connect = function(success){

    mongoose.connect('mongodb://admin:mypassword@ds047945.mongolab.com:47945/heroku_72h76cfr');

    mongoose.connection.on('error', function(err){

        console.log(err);

    });

    mongoose.connection.once('open', function(){

        if(success){
            success();
        }

        console.log('Database connected');

    });

};