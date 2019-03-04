/**
 *  html controller will take care of all page routes
 */
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    app.get('/', function(req, res) {
        res.render('index');
    });
};