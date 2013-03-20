process.env.NODE_ENV = 'test';

var request          = require('request');
var Version          = require('../models/version.js');
var querystring      = require('querystring');

describe('update package information to the server', function (done) {

  //remove all the documents in the versions collection prior to testing
  before(function (done) {
    Version.remove({}, function () {
      done();
    });
  });

  it('should add the version info', function (done) {
    var data               = {};
    data.client            = 'mbase';
    data.application       = 'pos';
    data.bitVersion        = 64;
    data.version           = '0.0.3';
    data.updateableRegions = ['India', 'USA'];
    data.operatingSystems  = ['windows'];
    data.updateableFrom    = ['0.0.1', '0.0.2'];
    data.downloadUrl       = ['http://google.com', 'http://yahoo.com'];

    request.post({
      uri            : 'http://localhost:8080/manage/version',
      json           : data
    }, function (err, res, body) {
      if (err) {
        console.log(err);
      }

      console.log(body, '********');

      body._id.should.not.be.empty;
      body.application.should.eql(data.application);
      body.client.should.eql(data.client);
      body.operatingSystems.should.eql(data.operatingSystems);
      body.bitVersion.should.eql(data.bitVersion);
      body.version.should.eql(data.version);
      body.updateableFrom.should.eql(data.updateableFrom);
      body.downloadUrl.should.eql(data.downloadUrl);
      body.updateableRegions.should.eql(data.updateableRegions);

      done();
    });
  });

  //update region
  it('should update region of the package', function (done) {
    var data               = {};
    data.client            = 'mbase';
    data.application       = 'pos';
    data.operatingSystems  = ['windows'];
    data.bitVersion        = 64;
    data.updateableRegions = ['India', 'USA'];
    data.version           = '0.0.3';
    data.updateableFrom    = ['0.0.1', '0.0.2'];
    data.downloadUrl       = ['http://google.com', 'http://yahoo.com'];

    delete data.updateableRegions; //remove update able regions from collection
    data.updateableRegions = ['Sri Lanka', 'UK'];

    request.put({
      url            : 'http://localhost:8080/manage/region',
      json           : data
    }, function (err, res, body) {
      res.should.have.status(200);
      body.updateableRegions.should.eql(data.updateableRegions);
      body.operatingSystems.should.eql(data.operatingSystems);

      done();
    });
  });

  //update download URL
  it('should update download url of the package', function (done) {
    var data               = {};
    data.client            = 'mbase';
    data.application       = 'pos';
    data.operatingSystems  = ['windows'];
    data.bitVersion        = 64;
    data.updateableRegions = ['India', 'USA'];
    data.version           = '0.0.3';
    data.updateableFrom    = ['0.0.1', '0.0.2'];
    data.downloadUrl       = ['http://google.com', 'http://yahoo.com'];

    delete data.downloadUrl; //remove download url from collection
    data.downloadUrl = ['http://linkedin.com', 'http://twitter.com'];

    Version.register(data, function (version) {
      request.put({
        url            : 'http://localhost:8080/manage/url',
        json           : data
      }, function (err, res, body) {
        res.should.have.status(200);
        body.downloadUrl.should.eql(data.downloadUrl);
        body.operatingSystems.should.eql(data.operatingSystems);

        done();
      });      
    });
  });

});
