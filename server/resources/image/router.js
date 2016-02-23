var mongoose    = require('mongoose');
var multipart   = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir:'./assets/images' });
var gm = require('gm');
/**
 * Initialize router
 * @param app
 */
exports.init = function(app){

    // API routes
    app.post('/api/upload', multipartMiddleware, function(req, res){

        console.log('Body: ', req.body);
        console.log('Files: ', req.files);

        var path = req.files.file.path;

        var uniqueFilenameParts = path.split('/');
        var uniqueFilename = uniqueFilenameParts[uniqueFilenameParts.length-1];

        var thumbPath = './assets/thumbs/'+uniqueFilename;

        var extParts = path.split('.');
        var ext = extParts[extParts.length-1];

        var Image = mongoose.model('Image');
        var image = new Image({
            fileName    : uniqueFilename,
            path        : '/assets/images/'+uniqueFilename,
            thumbPath   : '/assets/thumbs/'+uniqueFilename,
            ext         : ext
        });

        gm(path)
            .resize(353, 257)
            .autoOrient()
            .write(thumbPath, function (err) {
                if (!err) {
                    console.log(' hooray! ');
                    image.save(function (err) {

                        if (err) {
                            res.sendStatus(400);
                        } else {
                            res.send(image);
                        }

                    });
                }
            });

    });


};
