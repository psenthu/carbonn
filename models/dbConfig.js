var dbcfg    = require('../config.js').db;

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var db       = mongoose.createConnection('localhost', dbcfg.dbname);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  // yay!
});

exports.db     = db;
exports.Schema = Schema;