var griddataModel = require('../models/griddataModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    // griddata endpoint to get data from mongoDB griddata collection
    app.get('/api/griddata', function(request, response) {

        // read pagination params from requestuest
        var myPage = Number.parseInt(request.query.page);
        var myLimit = Number.parseInt(request.query.limit);
        var skipCount = myPage * myLimit;

        const query = griddataModel.aggregate([
            { $match:{} },
            { $lookup: { from: 'region', localField: 'ba', foreignField: 'regionId', as: 'region' } },
            { $lookup: { from: 'datatype', localField: 'datatype', foreignField: 'typeid', as: 'datatype' } },
            { $unwind: { path: "$region", preserveNullAndEmptyArrays: true }},
            { $unwind: { path: "$datatype", preserveNullAndEmptyArrays: true } }
        ]);

        query.skip(skipCount).limit(myLimit).exec(function(err, data) {
            if (err) throw err; 
            response.send(data);
        });
        
    });
   
};