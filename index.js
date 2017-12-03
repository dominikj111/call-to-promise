
let callToPromise = require('./src/promiser')

exports.id = callToPromise.id
exports.successfn = callToPromise.successfn
exports.failfn = callToPromise.failfn
exports.when = callToPromise.when

exports.build = callToPromise.build
