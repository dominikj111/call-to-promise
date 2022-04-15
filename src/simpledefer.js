'use strict';

/**
 * @typedef {Function} TypeFnIsSameObjectAs
 * @param {SimpleDeferred} sd
 * @returns {boolean}
 */

/**
 * This type describes main object of this module.
 *
 * @typedef {{
 *  isPending: () => boolean,
 *  isSucceed: () => boolean,
 *  isFailed: () => boolean,
 *  isSameObjectAs: TypeFnIsSameObjectAs,
 *  promise: Promise,
 *  resolve: (any) => void,
 *  reject: (any) => void,
 * }} SimpleDeferred
 */

/**
 * This callback type notify about the action and it's status/result.
 *
 * @callback BooleanNotifierCallback
 * @param {boolean} result
 * @returns {void}
 */

/**
 *
 * @param {SimpleDeferred} sd It's a SimpleDeferred object
 * @param {BooleanNotifierCallback} closeback It notify about the promise status
 * @returns {Promise} It returns a new instance of Promise
 */
function injectResolveReject (sd, closeback) {
  return new Promise(function (s, f) {
    sd.resolve = function () {
      closeback(true);
      s.apply(
        sd,
        arguments.length > 1 ? { 0: arguments, length: 1 } : arguments
      );
    };
    sd.reject = function () {
      closeback(false);
      f.apply(
        sd,
        arguments.length > 1 ? { 0: arguments, length: 1 } : arguments
      );
    };
  });
}

function Deferred () {
  var pending = true;
  var failed, succeed;

  this.isPending = function () {
    return pending;
  };
  this.isSucceed = function () {
    return succeed;
  };
  this.isFailed = function () {
    return failed;
  };

  this.__pointerTestingProperty = 0;

  this.isSameObjectAs = function (there) {
    there.__pointerTestingProperty = 3;
    this.__pointerTestingProperty = 4;

    return there.__pointerTestingProperty === this.__pointerTestingProperty;
  };

  // eslint-disable-next-line no-empty-function
  this.resolve = function () {};
  // eslint-disable-next-line no-empty-function
  this.reject = function () {};

  this.promise = injectResolveReject(this, function (success) {
    if (!pending) {
      throw new Error('Promise is not pending');
    }
    pending = false;
    succeed = success;
    failed = !success;
  });
}

/**
 * @returns {SimpleDeferred} It returns a new instance of SimpleDeferred
 */
module.exports.defer = function () {
  return new Deferred();
};
