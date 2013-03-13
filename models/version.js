var db       = require('../config.js').db;

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var db       = mongoose.createConnection('localhost', db.dbname);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  // yay!
});

var versionSchema = new Schema({
	client           : String,
	application      : String,
	version          : String,
	updateableFrom   : Array,
	operatingSystems : Array,
	bitVersion       : Number,
	downloadUrl      : String,
	releaseDate      : {type: Date, 'default': Date.now}
});

exports.Version = db.model('Version', versionSchema);