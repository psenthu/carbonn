var should  = require('should');
var request = require('request');
var qs      = require('querystring');

describe('test update request to server', function (done) {
  it('should return JSON data with version values', function (done) {
    var url = ['http://carbonn.update.com:8080/update',
               'mbase',
               'pos',
               'linux',
               '64',
               '0.0.1'].join('/');

    var params = {};
    params.apikey = 'b%&@b(0p124KN';
    params.consumerkey = "s%1TAr@09RT1wwf"

    url = [url, qs.stringify(params)].join('?');

    request.get({url: url}, function (err, res, body) {
      if (err) { throw err; }

      if (res.statusCode === 200) {
        var json = JSON.parse(body);
        json.versions.should.have.length(2);
        done();
      }
    });
  });
});
