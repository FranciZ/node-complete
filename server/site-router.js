/**
 * Created by francizidar on 25/02/16.
 */

var mongoose = require('mongoose');

module.exports = function(app){

    // ejs template routes
    app.get('/', function(req, res){

        var Project = mongoose.model('Project');

        var query = Project.find();

        query.populate('images');

        query.exec(function(err, docs){

            res.render('landing', { title:'My Landing Page', projects:docs });

        });

    });

    // ejs template routes
    app.get('/project/:id', function(req, res){

        var projectId = req.params.id;

        var Project = mongoose.model('Project');

        var query = Project.findById(projectId);

        query.populate('images');

        query.exec(function(err, doc){

            res.render('project', { project:doc });

        });

    });




};