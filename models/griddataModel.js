var mongoose = require('mongoose');

var griddataSchema = new mongoose.Schema({
    point_time: String,
    value: Number,
    frequency: Number,
    market: String,
    ba: String,
    datatype: String

}, { collection: 'griddata' });

var griddata = mongoose.model('griddata', griddataSchema);

module.exports = griddata;