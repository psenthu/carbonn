var Version       = require('../models/version.js');
var UpdateHandler = {};

UpdateHandler.handler = {
  version: {
    get: function (request, response) {
      Version.fetchLatestVersion(request, function (newVersion) {
        response.serveJSON(newVersion);
      });
    },
    post: function (request, response) {

      request.resume();
      request.once('end', function () {
        // console.log(request.body,"********");
        Version.register(request.body, function (record) {
          response.serveJSON(record);
        });
      });

    },
    put: function (request, response) {
      response.serveJSON(request.qs);

      if(request.qs.region) {
        Version.updateRegion(request.querystring);
      }
    }
  }
};

UpdateHandler.routes = [
  ['/update/:client/:application/:os/:bitVersion/:version', '1/update#version', { verbose: true }],
  ['/upload', '1/update#version', { verbose: true }],
  ['/update/url', '1/update#version', { url: true }],
  ['/update/region', '1/update#version', { region: true }],
];

module.exports = UpdateHandler;