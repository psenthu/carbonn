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
      Version.register(request.qs, function (record) {
        response.serveJSON(record);
      });
    },
    put: function (request, response) {
      response.serveJSON(request.body);
    }
  }
};

UpdateHandler.routes = [
  ['/update/:client/:application/:os/:bitVersion/:version', '1/update#version', { verbose: true }],
  ['/update/:client/:application/:operatingSystems/:bitVersion/:version/:updateableFrom/:downloadUrl', '1/update#version', { verbose: true }],
  ['/upload', '1/update#version', { verbose: true }]
];

module.exports = UpdateHandler;