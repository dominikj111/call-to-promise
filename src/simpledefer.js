'use strict';

function Deferred () {
  var pending = true;
  var failed, succeed;
  var me = this;

  var closeIt = function (success) {
    if (!pending) {
      throw new Error('Promise is not pending');
    }
    pending = false;
    succeed = success;
    failed = !success;
  };

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

  this.promise = new Promise(function (s, f) {
    me.resolve = function () {
      closeIt(true);
      s.apply(
        me,
        arguments.length > 1 ? { 0: arguments, length: 1 } : arguments
      );
    };
    me.reject = function () {
      closeIt(false);
      f.apply(
        me,
        arguments.length > 1 ? { 0: arguments, length: 1 } : arguments
      );
    };
  });
}

module.exports.defer = function () {
  return new Deferred();
};
