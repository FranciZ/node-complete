var bcrypt = require('bcrypt');
var mongoose    = require('mongoose');

/**
 * Initialize router
 * @param app
 */
exports.init = function(app){

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
