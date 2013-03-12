var should  = require('should');
var version = require('../version.js');

describe('test latest version fetch', function (done) {
  describe('fetchLatestVersions()', function (done) {
    it('should return 2 array elements', function (done) {
      var latest = ['0.0.2', '0.0.3'];
      var args = {
        querystring: {
          client: 'mbase',
          application: 'pos',
          os: 'windows',
          bit: 64,
          version: '0.0.1'
        }
      };

      version.fetchLatestVersions(args, function (results) {
        console.log(results);
        done();
      });
    });
  });
});
//update/:client/:application/:os/:bit/:version