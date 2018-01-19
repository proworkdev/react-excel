// config/database.js
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = {

    'url': 'mongodb://127.0.0.1:/tokenapi' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};