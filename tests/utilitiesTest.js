let expect = require('chai').expect;
let uti = require('../src/utilities.js');

describe('Utilities', () => {
  describe('Api tests', () => {
    it('should return false when string is not passed or is passed any other type', () => {
      expect(uti.isString('test')).to.eql(true);
      expect(uti.isString('')).to.eql(true);
      expect(uti.isString(undefined)).to.eql(false);
      expect(uti.isString()).to.eql(false);
      expect(uti.isString({})).to.eql(false);
      expect(uti.isString(0)).to.eql(false);
      expect(uti.isString(true)).to.eql(false);

      expect(uti.isNotString('test')).to.eql(false);
      expect(uti.isNotString('')).to.eql(false);
      expect(uti.isNotString(undefined)).to.eql(true);
      expect(uti.isNotString()).to.eql(true);
      expect(uti.isNotString({})).to.eql(true);
      expect(uti.isNotString(0)).to.eql(true);
      expect(uti.isNotString(true)).to.eql(true);
    });
    it('should return true only when array of string is passed', () => {
      expect(uti.isArrayOfStrings('test')).to.eql(false);
      expect(uti.isArrayOfStrings(0)).to.eql(false);
      expect(uti.isArrayOfStrings([0])).to.eql(false);
      expect(uti.isArrayOfStrings([0, 2])).to.eql(false);
      expect(uti.isArrayOfStrings([0, 'a'])).to.eql(false);
      expect(uti.isArrayOfStrings({})).to.eql(false);
      expect(uti.isArrayOfStrings({ a: 'a', b: 2 })).to.eql(false);
      expect(uti.isArrayOfStrings({ a: 3 })).to.eql(false);
      expect(uti.isArrayOfStrings({ 1: 3 })).to.eql(false);
      expect(uti.isArrayOfStrings({ 1: 3, 2: 'a' })).to.eql(false);
      expect(uti.isArrayOfStrings({ 1: 3, 2: 'a', length: 2 })).to.eql(false);
      expect(uti.isArrayOfStrings({ 0: '3', 1: 'a' })).to.eql(false);
      expect(uti.isArrayOfStrings({ 0: '3', 1: 'a', length: 2 })).to.eql(false);

      expect(uti.isArrayOfStrings(['a', 's', '2'])).to.eql(true);

      expect(uti.isNotArrayOfStrings('test')).to.eql(true);
      expect(uti.isNotArrayOfStrings(0)).to.eql(true);
      expect(uti.isNotArrayOfStrings([0])).to.eql(true);
      expect(uti.isNotArrayOfStrings([0, 2])).to.eql(true);
      expect(uti.isNotArrayOfStrings([0, 'a'])).to.eql(true);
      expect(uti.isNotArrayOfStrings({})).to.eql(true);
      expect(uti.isNotArrayOfStrings({ a: 'a', b: 2 })).to.eql(true);
      expect(uti.isNotArrayOfStrings({ a: 3 })).to.eql(true);
      expect(uti.isNotArrayOfStrings({ 1: 3 })).to.eql(true);
      expect(uti.isNotArrayOfStrings({ 1: 3, 2: 'a' })).to.eql(true);
      expect(uti.isNotArrayOfStrings({ 1: 3, 2: 'a', length: 2 })).to.eql(true);
      expect(uti.isNotArrayOfStrings({ 0: '3', 1: 'a' })).to.eql(true);
      expect(uti.isNotArrayOfStrings({ 0: '3', 1: 'a', length: 2 })).to.eql(
        true
      );

      expect(uti.isNotArrayOfStrings(['a', 's', '2'])).to.eql(false);
    });
    it('should return true when array contains only string values', () => {
      expect(uti.isArrayLikeOfStrings('test')).to.eql(false);
      expect(uti.isArrayLikeOfStrings(0)).to.eql(false);
      expect(uti.isArrayLikeOfStrings([0])).to.eql(false);
      expect(uti.isArrayLikeOfStrings([0, 2])).to.eql(false);
      expect(uti.isArrayLikeOfStrings([0, 'a'])).to.eql(false);
      expect(uti.isArrayLikeOfStrings({})).to.eql(false);
      expect(uti.isArrayLikeOfStrings({ a: 'a', b: 2 })).to.eql(false);
      expect(uti.isArrayLikeOfStrings({ a: 3 })).to.eql(false);
      expect(uti.isArrayLikeOfStrings({ 1: 3 })).to.eql(false);
      expect(uti.isArrayLikeOfStrings({ 1: 3, 2: 'a' })).to.eql(false);
      expect(uti.isArrayLikeOfStrings({ 1: 3, 2: 'a', length: 2 })).to.eql(
        false
      );
      expect(uti.isArrayLikeOfStrings({ 0: '3', 1: 'a' })).to.eql(false);

      expect(uti.isArrayLikeOfStrings({ 0: '3', 1: 'a', length: 2 })).to.eql(
        true
      );
      expect(uti.isArrayLikeOfStrings(['a', 's', '2'])).to.eql(true);

      expect(uti.isNotArrayLikeOfStrings('test')).to.eql(true);
      expect(uti.isNotArrayLikeOfStrings(0)).to.eql(true);
      expect(uti.isNotArrayLikeOfStrings([0])).to.eql(true);
      expect(uti.isNotArrayLikeOfStrings([0, 2])).to.eql(true);
      expect(uti.isNotArrayLikeOfStrings([0, 'a'])).to.eql(true);
      expect(uti.isNotArrayLikeOfStrings({})).to.eql(true);
      expect(uti.isNotArrayLikeOfStrings({ a: 'a', b: 2 })).to.eql(true);
      expect(uti.isNotArrayLikeOfStrings({ a: 3 })).to.eql(true);
      expect(uti.isNotArrayLikeOfStrings({ 1: 3 })).to.eql(true);
      expect(uti.isNotArrayLikeOfStrings({ 1: 3, 2: 'a' })).to.eql(true);
      expect(uti.isNotArrayLikeOfStrings({ 1: 3, 2: 'a', length: 2 })).to.eql(
        true
      );
      expect(uti.isNotArrayLikeOfStrings({ 0: '3', 1: 'a' })).to.eql(true);

      expect(uti.isNotArrayLikeOfStrings({ 0: '3', 1: 'a', length: 2 })).to.eql(
        false
      );
      expect(uti.isNotArrayLikeOfStrings(['a', 's', '2'])).to.eql(false);
    });
  });
});
