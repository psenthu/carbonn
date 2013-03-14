var Version = function() {
  var db       = require('../config.js').db;

  var mongoose = require('mongoose');
  var Schema   = mongoose.Schema;
  var db       = mongoose.createConnection('localhost', db.dbname);

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function () {
    // yay!
  });

  var _versionSchema = new Schema({
    client           : String,
    application      : String,
    version          : String,
    updateableFrom   : Array,
    operatingSystems : Array,
    bitVersion       : Number,
    downloadUrl      : String,
    releaseDate      : {type: Date, 'default': Date.now}
  });

  var _model = db.model('versions', _versionSchema);

  var _searchVersions = function (request, done) {
    _model
      .where('updateableFrom').in([request.querystring.version])
      .where('operatingSystems').in([request.querystring.os])
      .where('bitVersion').equals(request.querystring.bit)
      .where('application').equals(request.querystring.application)
      .sort('version')
      .select('version downloadUrl releaseDate')
      .find(function (err, versions) {
        if ( err ) { throw err; }
        done(versions);
      });
  };

  return {
    model          : _model,
    searchVersions : _searchVersions
  }
}();

module.exports = Version;