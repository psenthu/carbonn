var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var versionSchema = new Schema({
  version: String,
  updateableFrom: Array,
  operatingSystems: Array,
  bitVersion: Number,
  downloadUrl: String,  
  releaseDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Version', versionSchema);