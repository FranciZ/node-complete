/**
 * Created by francizidar on 23/02/16.
 */


var mongoose = require('mongoose');

var schema = mongoose.Schema({

    dateTime        : { type:Date, default:Date.now },
    content         : String,
    title           : String,
    excerpt         : String

});

mongoose.model('Article', schema);