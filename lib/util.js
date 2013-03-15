var semver = require('semver');
var async  = require('async');
var Util   = {};

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

Util.asyncForEach = function (array, fn, callback) {
  array = array.slice(0);

  function process() {
    var item = array.pop();
    fn(item, function () {
      if (array.length > 0) {
        setTimeout(process, 0); //schedule immediately
      } else {
        callback(); // Done!
      }
    });
  }

  if (array.length > 0) {
    setTimeout(process, 0); //schedule immediately
  } else {
    callback(); // Done!
  }
};

Util.compareVersion = function (array, callback) {
  var sList = [];
  var nItem = null;

  var iterator = function (item, cb) {
    var cTrue = semver.gt(nItem.version, item.version);
    if (cTrue) {
      var index = sList.indexOf(item);
      sList.insert(index, nItem);
    }
    cb();
  }

  this.asyncForEach(array, function (item, cb) {
    if (sList.length === 0) {
      sList.insert(0, item);
      cb();
    }
    else {
      nItem = item;
      async.each(sList, iterator, function (err) {
        if (err) {
          console.log(err);
          throw err;
        }

        if(sList.indexOf(item) === -1) {
          sList.push(item);
        }

        cb();
      });
    }
  }, function () {
    callback(sList);
  });
};

module.exports = Util;