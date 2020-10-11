var express = require('express');
var app = express();
var mongoose = require('mongoose');

// load configuration file contianers MongoDB connection string
var config = require('./config');

// api controller for working with WattTime API
var apiController = require('./controllers/apiController');

// controller to manage all pages ( for now just the root page)
var htmlController = require('./controllers/htmlController');

// load port number from environment or default to 3000
var port = process.env.Production || 3000;

// maps assets path to /public - assets like .js .css
app.use('/assets', express.static(__dirname + '/public'));

// set template engine to ejs
app.set('view engine', 'ejs');

// connect to MongoDB database
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true });

htmlController(app);
apiController(app);

// run nodejs web server lisening to port 3000 - open http://localhost:3000
app.listen(port);

console.log("on browser go to http://localhost:3000");