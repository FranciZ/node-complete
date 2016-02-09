/**
 * Created by francizidar on 30/01/16.
 */

var multipart   = require('connect-multiparty');
var mongoose    = require('mongoose');
var multipartMiddleware = multipart({ uploadDir:'./assets/images' });
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var gm = require('gm');

module.exports = function(app){

    // ejs template routes
    app.get('/', function(req, res){

        console.log(req.session.user);

        res.render('landing/index', { title:'My Landing Page', user:req.session.user });

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

        // email, message
        var data = req.body;

        sendMail(data.email, data.message, function(){
            res.sendStatus(200);
        });

    });

    app.post('/api/project', function(req, res){

        var Project = mongoose.model('Project');

        var project = new Project(req.body);

        project.save(function(err){

            res.send(project);

        });

    });

    app.get('/api/login-status', function(req, res){

        if(req.session.user){
            res.sendStatus(200);
        }else{
            res.sendStatus(401);
        }

    });

    app.post('/api/logout', function(req, res){

        req.session.destroy(function(err){
            if(!err){
                res.sendStatus(200);
            }else{
                console.log(err);
                res.sendStatus(400);
            }
        });

    });

    app.post('/api/login', function(req, res){

        var data = req.body;

        var email = data.email;
        var password = data.password;

        var User = mongoose.model('User');
        User.findOne({ email:email }, function(err, doc){

            bcrypt.compare(password, doc.password, function(err, match) {

                if(match === true){

                    var hour = 3600000;
                    req.session.cookie.expires = new Date(Date.now() + hour);
                    req.session.cookie.maxAge = hour;
                    doc.password = null;
                    req.session.user = doc;
                    res.send(doc);

                }else{
                    res.sendStatus(401);
                }

            });

        });

    });

    app.post('/api/register', function(req, res){

        var data = req.body;

        var email = data.email;
        var password = data.password;

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {

                myHash = hash;
                data.password = hash;

                var User = mongoose.model('User');
                var user = new User(data);
                user.save(function(err){

                    if(!err) {
                        res.send(user);
                    }else{
                        console.log(err);
                        res.sendStatus(400);
                    }

                });

            });
        });


    });

    app.get('/api/projects', function(req, res){

        if(req.session.user) {

            var Project = mongoose.model('Project');

            Project.find(function (err, docs) {

                if (!err) {
                    res.send(docs);
                } else {
                    console.log(err);
                }

            });

        }else{

            res.sendStatus(401);

        }

    });


};

function sendMail(subject, html, cb){

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
        if(cb){
            cb();
        }
        console.log('Message sent: ' + info.response);
    });

}







