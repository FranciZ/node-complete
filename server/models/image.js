/**
 * Created by francizidar on 16/02/16.
 */

var mongoose = require('mongoose');

var schema = mongoose.Schema({

    fileName    : String,
    path        : String,
    ext         : String,
    thumbPath   : String

});

mongoose.model('Image', schema);