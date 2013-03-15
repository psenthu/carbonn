process.env.NODE_ENV = 'test';

var request          = require('request');
var Version          = require('../models/version.js');

describe('post package information to the server', function (done) {

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
      uri  : "http://localhost:8080/upload",
      body : data,
      json : true
    }, function (err, res, body) {
      if (err) {
        console.log(err);
      }

      var json = JSON.parse(body);

      json._id.should.not.be.empty;
      json.application.should.eql(data.application);
      json.client.should.eql(data.client);
      json.operatingSystems.should.eql(data.operatingSystems);
      json.bitVersion.should.eql(data.bitVersion);
      json.version.should.eql(data.version);
      json.updateableFrom.should.eql(data.updateableFrom);
      json.downloadUrl.should.eql(data.downloadUrl);
      json.updateableRegions.should.eql(data.updateableRegions);

      done();
    });
  });

  // it('should update region of the package', function (done) {
  //   var data               = {};
  //   data.client            = 'mbase';
  //   data.application       = 'pos';
  //   data.operatingSystems  = ['windows'];
  //   data.bitVersion        = 64;
  //   data.updateableRegions = ['India', 'USA'];
  //   data.version           = '0.0.3';
  //   data.updateableFrom    = ['0.0.1', '0.0.2'];
  //   data.downloadUrl       = ['http://google.com', 'http://yahoo.com'];
    
  //   var options            = {};
  //   options.uri            = "http://localhost:8080/update/region";
  //   options.qs             = data;
  //   options.headers        = {'content-type': 'application/json'};
  //   options.method         = 'PUT';
    
  //   Version.register(data, function (version) {
  //     delete data.downloadUrl; //remove url from collection
  //     data.downloadUrl = ['http://linkedin.com', 'http://facebook.com'];

  //     request(options, function (err, res, body) {
  //       console.log(body);
  //     });
  //   });

  // });

  //update region

  //update download URL

});
