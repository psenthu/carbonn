var ApiServer       = require('apiserver');
var Manage          = require('./lib/update-handler').Manage;
var Routes          = require('./lib/update-handler').Routes;
var apiServer       = new ApiServer({ port: 8080 });

apiServer.use(ApiServer.payloadParser());

// modules
apiServer.addModule('1', 'manage', Manage);

// custom routing
apiServer.router.addRoutes(Routes);

// events
apiServer.on('requestStart', function (pathname, time) {
  console.info(' ☉ :: start    :: %s', pathname);
}).on('requestEnd', function (pathname, time) {
  console.info(' ☺ :: end      :: %s in %dms', pathname, time);
}).on('error', function (pathname, err) {
  console.info(' ☹ :: error    :: %s (%s)', pathname, err.message);
}).on('timeout', function (pathname) {
  console.info(' ☂ :: timedout :: %s', pathname);
});

exports.apiServer = apiServer;
apiServer.listen();