process.env.NODE_ENV = 'test';

var Version          = require('../models/version.js');
var apiServer        = require('../app.js');
var db               = require('../models/dbConfig.js').db;
var fixtures         = require('./fixtures/version_fixtures.js');

describe('Version management', function (done) {
  before(function (done) {
    Version.remove({}, function () {
      fixtures.loadVersions(Version, function () {
        done();
      });
    });    
  });

  after(function (done) {
    Version.remove({}, function () {
      done();
    });
  });

  //search latest version
  it('should search for latest version', function (done) {
    var expectedVersion = {
      downloadUrl : ['http://google.com', 'http://yahoo.com'],
      version     : '0.0.2',
      application : 'pos'
    };

    var currentVersion = {
      querystring: {
        client      : 'mbase',
        application : 'pos',
        os          : 'windows',
        bitVersion  : 64,
        version     : '0.0.1',
        releaseDate : new Date(2013, 2, 13)
      }
    };

    Version.search(currentVersion, function (newVersion) {
      newVersion.length.should.eql(2);
      expectedVersion.version.should.eql(newVersion[0].version);
      expectedVersion.downloadUrl.should.have.length(newVersion[0].downloadUrl.length);
      expectedVersion.application.should.eql(newVersion[0].application);
      done();
    });
  });

  it('should fetch new version based on semver', function (done) {
    var expectedVersion = {
      downloadUrl : ['http://google.com', 'http://yahoo.com'],
      version     : '0.0.3'
    };

    var currentVersion = {
      querystring: {
        client      : 'mbase',
        application : 'pos',
        os          : 'windows',
        bitVersion  : 64,
        version     : '0.0.1',
        releaseDate : new Date(2013, 2, 13)
      }
    };

    Version.fetchLatestVersion(currentVersion, function (newVersion) {
      expectedVersion.version.should.eql(newVersion.version);
      expectedVersion.downloadUrl.should.have.length(newVersion.downloadUrl.length);
      done();
    });

  });

  it('should return [] data as there is no latest version', function (done) {
    var currentVersion = {
      querystring: {
        client      : 'mbase',
        application : 'pos',
        os          : 'windows',
        bitVersion  : 64,
        version     : '0.0.5',
        releaseDate : new Date(2013, 2, 13)
      }
    };

    Version.fetchLatestVersion(currentVersion, function (newVersion) {
      newVersion.should.be.empty;
      done();
    });

  });

});