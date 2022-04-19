import 'regenerator-runtime/runtime';
import * as c2p from '../dist/module.min.mjs';

describe('These will test that module.min.mjs is able to work on the es6 import/export', () => {
  it('confirm imported module API', () => {
    expect(new Set(Object.keys(c2p))).toEqual(
      new Set(['id', 'successfn', 'failfn', 'when', 'build'])
    );
    expect(new Set(Object.keys(c2p.build()))).toEqual(
      new Set(['id', 'successfn', 'failfn', 'when'])
    );
  });

  it('confirm cimple use case', () => {
    const c2pInner = c2p.build();
    let variable = 1;
    c2pInner.when('a').then(function (entry) {
      variable += entry;
      expect(variable).toBe(4);
    });
    c2pInner.successfn('a')(3);
  });
});
