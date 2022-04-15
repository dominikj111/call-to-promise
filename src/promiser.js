'use strict';

/**
 * @typedef {import('./simpledefer').SimpleDeferred} SimpleDeferred
 * @typedef {Object.<string, SimpleDeferred>} Collection
 *
 * @typedef {Function} PromiseResolutionFn
 * @param {*} value value or many values
 * @returns {void}
 */

var simpledefer = require('./simpledefer.js');
var utilities = require('./utilities.js');

/** @type {Collection} */
var globalCollection = {};

/**
 * It returns an instance of SimpleDeferred based on the given id.
 * If it isn't instantiated, it will be created and returned.
 *
 * @param {string} id A SimpleDeferred dictionary pointer
 * @param {Collection} collection A disctionary of SimpleDeferred objects
 * @returns {SimpleDeferred} It returns an instance of SimpleDeferred
 */
function get (id, collection) {
  if (!utilities.isString(id)) {
    throw new Error('ID has to be "string" only');
  }
  if (!collection[id]) {
    collection[id] = simpledefer.defer();
  }
  return collection[id];
}

/**
 * It returns the promise related to the SimpleDeferred object given by it's id.
 * If id[] is passed, it will return a Promise that will be resolved when
 * all Defferd objects will be resolved, otherwise it will return a Promise
 * for single Deferred object.
 *
 * @param {string|string[]} id A SimpleDeferred dictionary pointer
 * @param {Collection} collection A disctionary of SimpleDeferred objects
 * @returns {Promise} It returns SimpleDeferred's promise
 */
function getPromise (id, collection) {
  if (utilities.isString(id)) {
    // @ts-ignore
    return get(id, collection).promise;
  }

  if (utilities.isArrayOfStrings(id)) {
    return Promise.all(
      // @ts-ignore
      id.map(function (item) {
        return get(item, collection).promise;
      })
    );
  }

  throw new Error('getPromise expecting id(string) or id(array<string>)');
}

/**
 * It returns a global instance of SimpleDeferred based on the given id.
 * If it isn't instantiated, it will be created and returned.
 *
 * @param {string} id A SimpleDeferred dictionary pointer
 * @returns {SimpleDeferred} It returns an instance of SimpleDeferred
 */
exports.id = function (id) {
  return get(id, globalCollection);
};

/**
 * Call that function whenever you wish to fullfill global promise.
 *
 * @param {string} id A SimpleDeferred dictionary pointer
 * @returns {PromiseResolutionFn} Resolve function
 */
exports.successfn = function (id) {
  return get(id, globalCollection).resolve;
};

/**
 * Call that function whenever you wish to reject global promise.
 *
 * @param {string} id A SimpleDeferred dictionary pointer
 * @returns {PromiseResolutionFn} Reject function
 */
exports.failfn = function (id) {
  return get(id, globalCollection).reject;
};

/**
 * Call that function whenever you wish to work with promise.
 *
 * @param {string} id A SimpleDeferred dictionary pointer
 * @returns {Promise} Promise of global SimpleDeferred object
 */
exports.when = function (id) {
  return getPromise(id, globalCollection);
};

/**
 * It will give you a promiser to work upon it's local
 * collection of SimpleDeferred objects.
 *
 * @returns {{
 * id: (function(string): SimpleDeferred),
 * successfn: (function(string): PromiseResolutionFn),
 * failfn: (function(string): PromiseResolutionFn),
 * when: (function(string): Promise) }} It returns a promiser object
 * to work with own collection of SimpleDeferred objects
 */
exports.build = function () {
  // eslint-disable-next-line lines-around-comment
  /** @type {Collection} */
  var localCollection = {};

  return {

    /**
     * It returns an instance of SimpleDeferred based on the given id.
     * If it isn't instantiated, it will be created and returned.
     *
     * @param {string} id A SimpleDeferred dictionary pointer
     * @returns {SimpleDeferred} It returns an instance of SimpleDeferred
     */
    id: function (id) {
      return get(id, localCollection);
    },

    /**
     * Call that function whenever you wish to fullfill local promise.
     *
     * @param {string} id A SimpleDeferred dictionary pointer
     * @returns {PromiseResolutionFn} Resolve function
     */
    successfn: function (id) {
      return get(id, localCollection).resolve;
    },

    /**
     * Call that function whenever you wish to reject local promise.
     *
     * @param {string} id A SimpleDeferred dictionary pointer
     * @returns {PromiseResolutionFn} Reject function
     */
    failfn: function (id) {
      return get(id, localCollection).reject;
    },

    /**
     * Call that function whenever you wish to work with promise.
     *
     * @param {string} id A SimpleDeferred dictionary pointer
     * @returns {Promise} Promise of local SimpleDeferred object
     */
    when: function (id) {
      return getPromise(id, localCollection);
    }
  };
};
