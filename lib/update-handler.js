var UpdateHandler = function() {
  var _handler = {
    latestversion: {
      get: function (request, response) {
        response.serveJSON({
          id: request.querystring.id,
          verbose: request.querystring.verbose,
          method: 'GET',
          versions: ['0.0.2', '0.0.3'],
          querystring: request.querystring
        });
      }
    }
  };

  var _routes = [
    ['/update/:client/:application/:os/:bit/:version', '1/update#latestversion']
  ];

  return {
    handler : _handler,
    routes  : _routes
  }
}();

exports.UpdateHandler = UpdateHandler;