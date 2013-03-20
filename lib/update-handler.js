var Version       = require('../models/version.js');
var UpdateHandler = {};

// manage/version - get - Check for a latest version
// managne/version - post - Upload latest version
// manage/url - put - Update the download URL
// manage/region - put - Update the region

UpdateHandler.Manage = {
  version: {
    get: function (request, response) {
      Version.fetchLatestVersion(request, function (newVersion) {
        response.serveJSON(newVersion);
      });
    },
    post: function (request, response) {
      request.resume();

      request.once('end', function () {
        Version.register(request.body, function (record) {
          response.serveJSON(record);
        });
      });
    }
  },
  url: {
    put: function (request, response) {
      request.resume();

      request.once('end', function () {
        Version.updateDownloadUrl(request.body, function (record) {
          response.serveJSON(record);
        });
      });
    }
  },
  region: {
    put: function (request, response) {
      request.resume();

      request.once('end', function () {
        Version.updateRegion(request.body, function (record) {
          response.serveJSON(record);
        });
      });
    }
  }
};

UpdateHandler.Routes = [
  ['/manage/version/:client/:application/:os/:bitVersion/:version',
  '1/manage#version', { verbose: true }, true],
  ['/manage/url', '1/manage#url', { verbose: true }],
  ['/manage/region', '1/manage#region', { verbose: true }]
];

module.exports = UpdateHandler;