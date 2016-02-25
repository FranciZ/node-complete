
var nodemailer = require('nodemailer');
var resources = require('./resources');
var siteRouter  = require('./site-router');

module.exports = function(app){

    siteRouter(app);

    app.post('/api/email', function(req, res){

        // email, message
        var data = req.body;

        sendMail(data.email, data.message, function(){
            res.sendStatus(200);
        });

    });

    resources.initRouters(app);


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







