var mongoose    = require('mongoose');

/**
 * Initialize router
 * @param app
 */
exports.init = function(app){

    app.post('/api/article', function(req, res){

        var Article = mongoose.model('Article');

        var article = new Article(req.body);

        article.save(function(err){

            res.send(article);

        });

    });

    app.get('/api/articles', function(req, res){

        //if(req.session.user) {

        var Article = mongoose.model('Article');

        var query = Article.find();

        query.populate('projects');

        query.exec(function (err, docs) {

            if (!err) {
                res.send(docs);
            } else {
                console.log(err);
            }

        });

    });

    app.delete('/api/article/:id', function(req, res){

        var id = req.params.id;
        var Article = mongoose.model('Article');

        Article.findByIdAndRemove(id, function (err, doc) {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }

        });

    });

    app.get('/api/article/:id', function(req, res){

        var Article = mongoose.model('Article');

        var query = Article.findById(req.params.id);

        query.populate('projects');

        query.exec(function(err, doc){

            if(doc) {
                res.send(doc);
            }else{
                res.sendStatus(404);
            }

        });

    });


};
