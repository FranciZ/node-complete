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

    app.post('/api/email', function(req, res){

        // email, message
        var data = req.body;

        sendMail(data.email, data.message, function(){
            res.sendStatus(200);
        });

    });

    // PROJECTS

    app.post('/api/project', function(req, res){

        var Project = mongoose.model('Project');

        var project = new Project(req.body);

        project.save(function(err){

            res.send(project);

        });

    });

    app.get('/api/projects', function(req, res){

        //if(req.session.user) {

            var Project = mongoose.model('Project');

            Project.find(function (err, docs) {

                if (!err) {
                    res.send(docs);
                } else {
                    console.log(err);
                }

            });

        //}else{

            //res.sendStatus(401);

        //}

    });

    app.delete('/api/project/:id', function(req, res){

        if(req.session.user) {

            var id = req.params.id;
            var Project = mongoose.model('Project');

            Project.findByIdAndRemove(id, function (err, doc) {

                if (!err) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }

            });

        }else{

            res.sendStatus(401);

        }

    });

    app.get('/api/project/:id', function(req, res){

        var Project = mongoose.model('Project');

        Project.findById(req.params.id, function(err, doc){

            if(doc) {
                res.send(doc);
            }else{
                res.sendStatus(404);
            }

        });

    });

    app.put('/api/project/:id', function(req, res){

        var projectData = req.body;
        var projectId   = req.params.id;

        var Project = mongoose.model('Project');

        Project.findByIdAndUpdate(projectId, projectData,  { 'new': true }, function(err, doc){

            if(!err) {
                res.send(doc);
            }else{
                res.sendStatus(400);
            }

        });


    });

    // CHECK LOGIN STATUS
    app.get('/api/login-status', function(req, res){

        if(req.session.user){
            //res.sendStatus(200);
            res.send(req.session.user);
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
        User.findOne({ email : email }, function(err, userDoc){
            // compare the plain text password sent from the browser
            // with the hashed password stored in the database
            // belonging to this user (email)
            bcrypt.compare(password, userDoc.password, function(err, match) {

                if(match === true){

                    var hour = 3600000;
                    req.session.cookie.expires = new Date(Date.now() + hour);
                    req.session.cookie.maxAge = hour;
                    userDoc.password = null;
                    req.session.user = userDoc;
                    res.send(userDoc);

                }else{
                    res.sendStatus(401);
                }

            });

        });

    });

    app.post('/api/register', function(req, res){

        var data = req.body;

        var password = data.password;

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {

                var userDoc = {
                    email       : data.email,
                    password    : hash
                };

                var User = mongoose.model('User');
                var user = new User(userDoc);
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







