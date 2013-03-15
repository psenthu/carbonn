var Schema = require('./dbConfig').Schema;
var db     = require('./dbConfig').db;
var util   = require('../lib/util.js');

var _versionSchema = new Schema({
  client           : String,
  application      : String,
  version          : String,
  updateableFrom   : Array,
  operatingSystems : Array,
  bitVersion       : Number,
  downloadUrl      : Array,
  updateableRegions: Array,
  releaseDate      : {type: Date, 'default': Date.now}
});

var Version = db.model('Versions', _versionSchema);

Version.searchVersions = function (request, done) {
  var qs = request.querystring;
  Version
    .find({
      client            : qs.client,
      operatingSystems  : qs.os,
      updateableFrom    : qs.version,
      bitVersion        : qs.bitVersion,
      application       : qs.application
    })
    .sort('version')
    .select('version downloadUrl releaseDate application')
    .exec(function (err, versions) {
      if (err) {
        throw err;
      }
      done(err, versions);
    });
};

Version.register = function (_args, done) {
  var version = new Version(_args);

  version.save(function (err, v) {
    if (err) { throw err; }
    done(v);
  });
};

Version.updateRegion = function (_args, done) {
  console.log(_args);
};

Version.search = function (request, done) {
  this.searchVersions(request, function (err, list) {
    if (err) { throw err; }
    done(list);
  });
};

Version.fetchLatestVersion = function (request, done) {
  var qs = request.querystring;

  this.searchVersions(request, function (err, list) {
    if (err) { throw err; }

    util.compareVersion(list, function (newList) {
      done(newList[0] || []);
    });
  });
};

module.exports = Version;