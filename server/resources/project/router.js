var mongoose    = require('mongoose');

/**
 * Initialize router
 * @param app
 */
exports.init = function(app){

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

        var query = Project.find();

        query.populate('images');

        query.exec(function (err, docs) {

            if (!err) {
                res.send(docs);
            } else {
                console.log(err);
            }

        });

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



};
