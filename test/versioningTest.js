var should    = require('should');
var version   = require('../version.js');
var apiServer = require('../app.js');


describe('test latest version fetch', function (done) {

  before(function(done){
    version.model.remove(function(){
      done();
    });
  });

  describe('Versions', function(done){
    it('should push a version to the server', function(done){
      version.model.create({
          client           : 'mbase',
          application      : 'POS',
          version          : '0.0.3',
          updateableFrom   : ['0.0.1','0.0.2'],
          operatingSystems : ['windows'],
          bitVersion       : 64,
          downloadUrl      : 'http://localhost/0.0.3/'

      },function(err,res){

        version.model.find({client:'mbase', application:'POS'},function(err,res){
          res.length.should.be.equal(1);
          done();
        });
      });

    });
  });

  describe('fetchLatestVersions()', function (done) {
    it('should return 2 array elements', function (done) {
      var latest = ['0.0.2', '0.0.3'];
      var args = {
        querystring: {
          client      : 'mbase',
          application : 'pos',
          os          : 'windows',
          bit         : 64,
          version     : '0.0.1'
        }
      };

      version.fetchLatestVersions(args, function (results) {
        // console.log(results);
        // results.length.should.be.equal(0);
        done();
      });
    });
  });
});
//update/:client/:application/:os/:bit/:version