process.env.NODE_ENV = 'test';

var Version          = require('../models/version.js');
var request          = require('request');
var qs               = require('querystring');
var apiServer        = require('../app');
var fixtures         = require('./fixtures/version_fixtures.js');

describe('test update request to server', function (done) {
  before(function (done) {
    fixtures.loadVersions(Version, function () {
      done();
    });
  });

  after(function (done) {
    Version.remove({}, function () {
      done();
    });
  });

  it('should return version info as JSON', function (done) {
    var url            = 'http://localhost:8080/manage/version/mbase/pos/linux/64/0.0.1';
    var params         = {};
    params.apikey      = 'b%&@b(0p124KN';
    params.consumerkey = "s%1TAr@09RT1wwf";

    url = [url, qs.stringify(params)].join('?');

    request.get({url: url}, function (err, res, body) {
      if (err) {
        console.log(err);
      }

      var json = JSON.parse(body);
      res.should.have.status(200);
      json.version.should.equal('0.0.2');
      json.application.should.equal('pos');

      done();
    });
  });

  it('should return empty version info', function (done) {
    var url            = 'http://localhost:8080/manage/version/mbase/pos/linux/64/0.0.2';
    var params         = {};
    params.apikey      = 'b%&@b(0p124KN';
    params.consumerkey = "s%1TAr@09RT1wwf";

    url = [url, qs.stringify(params)].join('?');

    request.get({url: url}, function (err, res, body) {
      if (err) {
        console.log(err);
      }

      res.should.have.status(200);
      var json = JSON.parse(body);
      json.should.be.empty;

      done();
    });
  });

});
