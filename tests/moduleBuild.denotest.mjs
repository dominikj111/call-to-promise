import { assert, assertEquals } from 'https://deno.land/std@0.135.0/testing/asserts.ts';
import * as c2p from '../dist/module.min.mjs';

assertEquals(
  Object.keys(c2p).sort(),
  ['id', 'successfn', 'failfn', 'when', 'build'].sort(),
  'Confirmation of imported module API failed'
);
assertEquals(
  Object.keys(c2p.build()).sort(),
  ['id', 'successfn', 'failfn', 'when'].sort(),
  'Confirmation of built c2p API failed'
);

const c2pInner = c2p.build();
let variable = 1;
c2pInner.when('a').then(function (entry) {
  variable += entry;
  assert(variable === 4, "Confirmation of c2p's simple use case failed");
});
c2pInner.successfn('a')(3);

console.log('√ moduleBuild.denotest.mjs: All tests passed');
