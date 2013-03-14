var Schema = require('./dbConfig').Schema;
var db     = require('./dbConfig').db;

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

var Version = db.model('Versions', _versionSchema);

function searchVersions(request, done) {
  var qs = request.querystring;
  Version
    .find({
      client         : qs.client,
      operatingSystems             : qs.os,
      updateableFrom : qs.version,
      bitVersion     : qs.bitVersion,
      application    : qs.application
    })
    .sort('version')
    .select('version downloadUrl releaseDate')
    .exec(function(err, versions){
      if ( err ) {
        throw err;
      }
      done(err,versions);
    });

}

Version.searchVersions = searchVersions;

Version.register = function (_args, done) {
  var version = new Version(_args);

  version.save(function (err,v) {
    if ( err ) { throw err; }
    done(v);
  });

};

Version.search = function(request, done) {
  Version.searchVersions(request, function (err, list) {
    if ( err ) { throw err; }
    done(list);
  });
};

module.exports = Version;