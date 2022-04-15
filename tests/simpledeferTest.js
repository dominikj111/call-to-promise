let expect = require('chai').expect;
let simdef = require('../src/simpledefer.js');

describe('SimpleDefer', () => {
  let vrs = {};

  beforeEach(() => {
    vrs.deferred = simdef.defer();
  });

  describe('Basic api tests', () => {
    it('should extend Base object', () => {
      let def1 = simdef.defer();

      expect(def1.isSameObjectAs(vrs.deferred)).to.eql(false);
      expect(def1.isSameObjectAs(def1)).to.eql(true);
    });

    it('should exists an object with Promise object, resolve and reject function', () => {
      expect(vrs.deferred.promise.toString()).to.eql('[object Promise]');
      expect(vrs.deferred.resolve).to.be.a('function');
      expect(vrs.deferred.reject).to.be.a('function');
    });

    it('should resolve as a promise object - with resolve after', () => {
      vrs.deferred.promise.then((a) => expect(a).to.eql([1, 2.3]));

      vrs.deferred.resolve([1, 2.3]);

      expect(vrs.deferred.isSucceed()).to.eql(true);
      expect(vrs.deferred.isFailed()).to.eql(false);
    });

    it('should resolve as a promise object - with resolve before', () => {
      vrs.deferred.resolve({ a: 1 });

      vrs.deferred.promise.then((a) => expect(a).to.eql({ a: 1 }));
    });

    it('should return correct pending value after and before resolve', () => {
      expect(vrs.deferred.isPending()).to.eql(true);

      vrs.deferred.resolve();

      expect(vrs.deferred.isPending()).to.eql(false);
    });

    it('should reject as a promise object - with reject after', () => {
      vrs.deferred.promise.then(
        () => {},
        (a) => expect(a).to.eql([1, 2.3])
      );

      vrs.deferred.reject([1, 2.3]);

      expect(vrs.deferred.isSucceed()).to.eql(false);
      expect(vrs.deferred.isFailed()).to.eql(true);
    });

    it('should reject as a promise object - with reject before', () => {
      vrs.deferred.reject({ a: 1 });

      vrs.deferred.promise.then(
        () => {},
        (a) => expect(a).to.eql({ a: 1 })
      );
    });
  });

  describe('Behaviour tests', () => {
    it('should reject when thrown exeption in then success function', () => {
      vrs.deferred.promise
        .then(
          () => {
            throw 'test throw';
          },
          () => {}
        )
        .then(
          () => {
            throw 'should not success when thrown exception before';
          },
          () => {}
        );

      vrs.deferred.resolve();

      expect(vrs.deferred.reject).to.throw();
    });
  });

  describe('Argument testing', () => {
    it('should pass one argument as usual - simple numeric value', () => {
      vrs.deferred.resolve(1);
      vrs.deferred.promise.then((a) => expect(a).to.eql(1));
    });

    it('should pass one argument as usual - string value', () => {
      vrs.deferred.resolve('hello promise');
      vrs.deferred.promise.then((a) => expect(a).to.eql('hello promise'));
    });

    it('should pass one argument as usual - object value', () => {
      vrs.deferred.resolve({ a: 1, b: 'ab' });
      vrs.deferred.promise.then((a) => expect(a).to.eql({ a: 1, b: 'ab' }));
    });

    it('should pass more then one arguments as an array', () => {
      vrs.deferred.resolve({ a: 1, b: 'ab' }, 2, 'd');

      let testArgs = { 0: { a: 1, b: 'ab' }, 1: 2, 2: 'd' };

      vrs.deferred.promise.then((a) => {
        for (let i = 0; i < 3; i++) {
          expect(a[i]).to.eql(testArgs[i]);
        }
      });
    });
  });
});
