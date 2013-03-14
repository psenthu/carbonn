var Version = function () {
  var semver        = require('semver');
  var versionModel  = require('../models/version.js');

  var _register = function (_args, done) {
    var version = versionModel.model(_args);
    
    version.save(function (err) {
      if ( err ) { throw err; }
      done(version);
    });
  };

  var _search = function(request, done) {
    var versions = versionModel.searchVersions(request, function (err, list) {
      if ( err ) { throw err; }
      done(list);
    });
  };

  return {
    register: _register,
    search: _search
  }
}();

module.exports = Version;