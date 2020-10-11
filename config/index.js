/**
 * this module is to load configurations. for now we load only MongoDB credentials
 * we can add any new configs.
 */
var configValues = require('./config');

module.exports = {
    getDbConnectionString: function () {
        return "mongodb+srv://" + configValues.uname + ":" +
            configValues.pwd + "@swytchcluster.ak7mj.mongodb.net/swytch?retryWrites=true&w=majority";
    }
};