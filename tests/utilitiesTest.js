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
    });
  });
});
