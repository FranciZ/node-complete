/**
 * Created by francizidar on 30/01/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({

    title           : String,
    description     : String,
    date            : { type:Date, default:Date.now },
    images          : [ { type:Schema.Types.ObjectId, ref:'Image' } ],
    coverImage      : { fileName:String, path:String, thumbPath:String, ext:String }

});

mongoose.model('Project', schema);