'use strict';

var simdef = require('./simpledefer.js');
var uti = require('./utilities.js');

var globalCollection = {};

function get (id, collection) {
  if (uti.isNotString(id)) {
    throw new Error('ID has to be "string" only');
  }
  if (!collection[id]) {
    collection[id] = simdef.defer();
  }
  return collection[id];
}

function getPromise (id, collection) {
  if (uti.isString(id)) {
    return get(id, collection).promise;
  }

  if (uti.isArrayOfStrings(id)) {
    return Promise.all(
      id.map(function (item) {
        return get(item, collection).promise;
      })
    );
  }

  throw new Error('getPromise expecting id(string) or id(array<string>)');
}

exports.id = function (id) {
  return get(id, globalCollection);
};
exports.successfn = function (id) {
  return get(id, globalCollection).resolve;
};
exports.failfn = function (id) {
  return get(id, globalCollection).reject;
};
exports.when = function (id) {
  return getPromise(id, globalCollection);
};

exports.build = function () {
  var localCollection = {};

  return {
    id: function (id) {
      return get(id, localCollection);
    },
    successfn: function (id) {
      return get(id, localCollection).resolve;
    },
    failfn: function (id) {
      return get(id, localCollection).reject;
    },
    when: function (id) {
      return getPromise(id, localCollection);
    }
  };
};
