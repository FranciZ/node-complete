/**
 * Created by francizidar on 30/01/16.
 */

var mongoose = require('mongoose');

var schema = mongoose.Schema({

    email           : { type : String, unique : true },
    password        : String,
    dateTime        : { type : Date, default : Date.now }

});

mongoose.model('User', schema);