/**
 * Created by francizidar on 23/02/16.
 */

/**
 * Initialise all routes
 * @param app
 */
exports.initRouters = function(app){

    require('./article/router').init(app);
    require('./image/router').init(app);
    require('./project/router').init(app);
    require('./user/router').init(app);

};

exports.initModels = function(){

    require('./article/model');
    require('./project/model');
    require('./user/model');
    require('./image/model');

};