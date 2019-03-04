/**
 * this module is to load configurations. for now we load only MongoDB credentials
 * we can add any new configs.
 */
var configValues = require('./config');

module.exports = {

    getDbConnectionString: function() {
        return "mongodb://" + configValues.uname + ":" +
            configValues.pwd + "@ds153495.mlab.com:53495/swytch";
    }

};