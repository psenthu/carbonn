var should    = require('should');
var Version   = require('../models/version.js');
var apiServer = require('../app.js');
var db        = require('../models/dbConfig.js').db;

process.env.NODE_ENV = 'test';

describe('Version management', function (done) {
  beforeEach(function (done) {

    var fakeVersions = [
      {client: 'mbase', application: 'pos',   operatingSystems: 'windows', bitVersion: 64, version: '0.0.1', updateableFrom: ['0.0.0'], downloadUrl: 'http://google.com', releaseDate: new Date(2013, 2, 13)},
      {client: 'mbase', application: 'pos',   operatingSystems: 'linux',   bitVersion: 64, version: '0.0.1', updateableFrom: ['0.0.0'], downloadUrl: 'http://google.com', releaseDate: new Date(2013, 2, 13)},
      {client: 'mbase', application: 'pos',   operatingSystems: 'mac',     bitVersion: 64, version: '0.0.1', updateableFrom: ['0.0.0'], downloadUrl: 'http://google.com', releaseDate: new Date(2013, 2, 13)},
      {client: 'mbase', application: 'music', operatingSystems: 'windows', bitVersion: 64, version: '0.0.1', updateableFrom: ['0.0.0'], downloadUrl: 'http://google.com', releaseDate: new Date(2013, 2, 13)},
      {client: 'mbase', application: 'music', operatingSystems: 'linux',   bitVersion: 64, version: '0.0.1', updateableFrom: ['0.0.0'], downloadUrl: 'http://google.com', releaseDate: new Date(2013, 2, 13)},
      {client: 'mbase', application: 'music', operatingSystems: 'mac',     bitVersion: 64, version: '0.0.1', updateableFrom: ['0.0.0'], downloadUrl: 'http://google.com', releaseDate: new Date(2013, 2, 13)},
      {client: 'mbase', application: 'pos',   operatingSystems: 'windows', bitVersion: 64, version: '0.0.2', updateableFrom: ['0.0.1'], downloadUrl: 'http://google.com', releaseDate: new Date(2013, 2, 13)},
      {client: 'mbase', application: 'pos',   operatingSystems: 'linux',   bitVersion: 64, version: '0.0.2', updateableFrom: ['0.0.1'], downloadUrl: 'http://google.com', releaseDate: new Date(2013, 2, 13)},
      {client: 'mbase', application: 'pos',   operatingSystems: 'mac',     bitVersion: 64, version: '0.0.2', updateableFrom: ['0.0.1'], downloadUrl: 'http://google.com', releaseDate: new Date(2013, 2, 13)},
      {client: 'mbase', application: 'music', operatingSystems: 'windows', bitVersion: 64, version: '0.0.2', updateableFrom: ['0.0.1'], downloadUrl: 'http://google.com', releaseDate: new Date(2013, 2, 13)},
      {client: 'mbase', application: 'music', operatingSystems: 'linux',   bitVersion: 64, version: '0.0.2', updateableFrom: ['0.0.1'], downloadUrl: 'http://google.com', releaseDate: new Date(2013, 2, 13)},
      {client: 'mbase', application: 'music', operatingSystems: 'mac',     bitVersion: 64, version: '0.0.2', updateableFrom: ['0.0.1'], downloadUrl: 'http://google.com', releaseDate: new Date(2013, 2, 13)}
    ];

    var dsize = 0;

    function callback(r) {
      ++dsize;
      if(dsize === fakeVersions.length){
        done();
      }
    }

    var i = 0;
    var addFakeData = function(done) {
      for (i = 0; i < fakeVersions.length; i++) {
        Version.register(fakeVersions[i], callback);
      }

    };

    addFakeData(done);

  });

  afterEach(function (done) {
    Version.remove({}, function() {
      // db.close(function () {
      //   done();
      // });
      done();
    });

  });

  //search latest version
  it('should search for latest version', function (done) {
    var expectedVersion = {
      downloadUrl : 'http://google.com',
      version     : '0.0.2',
      releaseDate : new Date(2013, 3, 13)
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
      // expectedVersion.should.eql(newVersion[0]);
      newVersion.length.should.eql(1);
      expectedVersion.version.should.eql(newVersion[0].version);
      expectedVersion.downloadUrl.should.eql(newVersion[0].downloadUrl);
      done();
    });
  });

});