var semver   = require('semver');
var Version  = require('./models/version.js').Version;

exports.fetchLatestVersions = function (request, done) {
  Version
    .where('updateableFrom').in([request.querystring.version])
    .where('operatingSystems').in([request.querystring.os])
    .where('bitVersion').equals(request.querystring.bit)
    .sort('version')
    .select('version downloadUrl releaseDate')
    .find(function (err, versions) {
      if ( err ) { throw err; }
      done(versions);
    });
};

exports.model = Version;