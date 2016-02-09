/**
 * Created by francizidar on 30/01/16.
 */

var mongoose = require('mongoose');

var schema = mongoose.Schema({

    title           : String,
    description     : String,
    date            : { type:Date, default:Date.now }

});

mongoose.model('Project', schema);