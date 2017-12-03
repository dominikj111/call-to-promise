[![GitHub version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=gh&type=6&v=1.0.6&x2=0)](https://d25lcipzij17d.cloudfront.net/badge.svg?id=gh&type=6&v=1.0.6&x2=0)
[![Coverage Status](https://coveralls.io/repos/boennemann/badges/badge.svg)](https://coveralls.io/r/boennemann/badges)
[![Dependency Status](https://david-dm.org/dwyl/esta.svg)](https://david-dm.org/dwyl/esta)

## What is it?
Library offers to create callback functions and connect it by unique id descriptor with the promise object.

## How to use it?
Just call `successfn` function to get success callback. `failfn` return fail callback.

    c2p = require('call-to-promise')
    function countIn(a, b, resultback) {
        resultback(a+b);
    }
    
    countIn(3, 4, c2p.successfn('id'))
    c2p.when('id').then(console.log) // -> 7
    
## Multiple arguments
When success or fail callback is called with object, simple value or array, those are available as usual in the promise function.
Multiple arguments are wrapped into object, because resolve and reject functions pass only one argument.

    c2p = require('call-to-promise')
    function countIn(a, b, resultback) {
        resultback(a+b, a*b, a-b);
    }
    
    countIn(3, 4, c2p.successfn('id'))
    c2p.when('id').then(console.log) // -> { '0': { '0': 7, '1': 12, '2': -1 }}

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
