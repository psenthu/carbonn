var async    = require('async');
var Fixtures = {};

Fixtures.loadVersions = function (model, callback) {
  var data = [
    {client: 'mbase', application: 'pos',   operatingSystems: 'windows', bitVersion: 64, version: '0.0.1', updateableFrom: ['0.0.0'], downloadUrl: ['http://google.com', 'http://yahoo.com']},
    {client: 'mbase', application: 'pos',   operatingSystems: 'linux',   bitVersion: 64, version: '0.0.1', updateableFrom: ['0.0.0'], downloadUrl: ['http://google.com', 'http://yahoo.com']},
    {client: 'mbase', application: 'pos',   operatingSystems: 'mac',     bitVersion: 64, version: '0.0.1', updateableFrom: ['0.0.0'], downloadUrl: ['http://google.com', 'http://yahoo.com']},
    {client: 'mbase', application: 'music', operatingSystems: 'windows', bitVersion: 64, version: '0.0.1', updateableFrom: ['0.0.0'], downloadUrl: ['http://google.com', 'http://yahoo.com']},
    {client: 'mbase', application: 'music', operatingSystems: 'linux',   bitVersion: 64, version: '0.0.1', updateableFrom: ['0.0.0'], downloadUrl: ['http://google.com', 'http://yahoo.com']},
    {client: 'mbase', application: 'music', operatingSystems: 'mac',     bitVersion: 64, version: '0.0.1', updateableFrom: ['0.0.0'], downloadUrl: ['http://google.com', 'http://yahoo.com']},
    {client: 'mbase', application: 'pos',   operatingSystems: 'windows', bitVersion: 64, version: '0.0.2', updateableFrom: ['0.0.1'], downloadUrl: ['http://google.com', 'http://yahoo.com']},
    {client: 'mbase', application: 'pos',   operatingSystems: 'windows', bitVersion: 64, version: '0.0.3', updateableFrom: ['0.0.1'], downloadUrl: ['http://google.com', 'http://yahoo.com']},
    {client: 'mbase', application: 'pos',   operatingSystems: 'linux',   bitVersion: 64, version: '0.0.2', updateableFrom: ['0.0.1'], downloadUrl: ['http://google.com', 'http://yahoo.com']},
    {client: 'mbase', application: 'pos',   operatingSystems: 'mac',     bitVersion: 64, version: '0.0.2', updateableFrom: ['0.0.1'], downloadUrl: ['http://google.com', 'http://yahoo.com']},
    {client: 'mbase', application: 'music', operatingSystems: 'windows', bitVersion: 64, version: '0.0.2', updateableFrom: ['0.0.1'], downloadUrl: ['http://google.com', 'http://yahoo.com']},
    {client: 'mbase', application: 'music', operatingSystems: 'linux',   bitVersion: 64, version: '0.0.2', updateableFrom: ['0.0.1'], downloadUrl: ['http://google.com', 'http://yahoo.com']},
    {client: 'mbase', application: 'music', operatingSystems: 'mac',     bitVersion: 64, version: '0.0.2', updateableFrom: ['0.0.1'], downloadUrl: ['http://google.com', 'http://yahoo.com']}
  ];

  var iterator = function (item, done) {
    model.register(item, done);
  }

  async.each(data, iterator, function (err) {
    callback();
  });
}

module.exports = Fixtures;