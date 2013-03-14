var should    = require('should');
var version   = require('../lib/version.js');
var apiServer = require('../app.js');

process.env.NODE_ENV = 'test';

describe('Version management', function (done) {
  beforeEach(function (done) {
    function callback(r) {
      //do nothing
    }

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

    var i = 0;
    var addFakeData = function(done) {
      for (i = 0; i < fakeVersions.length; i++) {
        version.register({querystring:fakeVersions[i]}, callback);
      }

      done();
    };

    addFakeData(done);
  });

  afterEach(function (done) {
    version.model.remove({}, function() {
      db.connection.close(function () {
        done();
      });      
    });
  });

  //search latest version
  it('should search for latest version', function (done) {
    var expectedVersion = {
      url         : 'http://google.com',
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

    version.search(currentVersion, function (newVersion) {
      expectedVersion.should.eql(newVersion);
      done();
    });
  });

});