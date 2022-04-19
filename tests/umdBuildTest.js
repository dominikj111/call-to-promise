global.window = {};
global.self = {};

const expect = require('chai').expect;
require('../dist/umd.min.js');

describe('Testing c2b api availability in the global window object of the Browser', () => {
  it('should provide promiser\'s api as a global.window.c2p', () => {
    expect(global.window.c2p).to.have.all.keys(
      'id',
      'successfn',
      'failfn',
      'when',
      'build'
    );
  });
});
