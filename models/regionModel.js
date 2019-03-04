var mongoose = require('mongoose');

var regionSchema = new mongoose.Schema({
    regionId: { type: mongoose.Schema.Types.String, ref: 'griddata' },
    ba: String

}, { collection: 'region' });

var region = mongoose.model('region', regionSchema);

module.exports = region;