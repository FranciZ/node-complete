/**
 * Created by francizidar on 30/01/16.
 */

var multipart   = require('connect-multiparty');
var mongoose    = require('mongoose');
var multipartMiddleware = multipart({ uploadDir:'./assets/images' });
var nodemailer = require('nodemailer');
var gm = require('gm');

module.exports = function(app){

    // ejs template routes
    app.get('/', function(req, res){

        res.render('landing/index', { title:'My Landing Page' });

    });

    // API routes
    app.post('/api/upload', multipartMiddleware, function(req, res){

        console.log('Body: ', req.body);
        console.log('Files: ', req.files);

        var path = req.files.file.path;

        var uniqueFilenameParts = path.split('/');
        var uniqueFilename = uniqueFilenameParts[uniqueFilenameParts.length-1];

        var thumbPath = './assets/thumbs/'+uniqueFilename;

        gm(path)
            .resize(353, 257)
            .autoOrient()
            .write(thumbPath, function (err) {
                if (!err) console.log(' hooray! ');
            });

        res.sendStatus(200);

    });

    app.post('/api/email', function(req, res){

        var data = req.body;

        sendMail(data.title, data.description);

    });

    app.post('/api/project', function(req, res){

        var Project = mongoose.model('Project');

        var project = new Project(req.body);

        project.save(function(err){

            res.send(project);

        });

    });

    app.get('/api/projects', function(req, res){

        var Project = mongoose.model('Project');

        Project.find(function(err, docs){

            if(!err){
                res.send(docs);
            }else{
                console.log(err);
            }

        });

    });


};

function sendMail(subject, html){

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://fzridar@gmail.com:mojegeslo@smtp.gmail.com');

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Franci', // sender address
        to: 'franci@proxima.si', // list of receivers
        subject: subject, // Subject line
        text:'', // plaintext body
        html: html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

}







