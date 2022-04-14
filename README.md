[![GitHub version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=gh&type=6&v=1.0.12&x2=0)](https://d25lcipzij17d.cloudfront.net/badge.svg?id=gh&type=6&v=1.0.12&x2=0)
[![Coverage Status](https://coveralls.io/repos/boennemann/badges/badge.svg)](https://coveralls.io/r/boennemann/badges)
[![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)](https://github.com/dwyl/goodparts "JavaScript The Good Parts")
[![Dependency status](https://deps.rs/repo/github/jonhoo/hashbag/status.svg)](https://deps.rs/repo/github/jonhoo/hashbag)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

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

## Real Life example - reading files

    c2p = require('call-to-promise')
    fs = require('fs')

    // callback approach - probably better :-) because of passing multiple arguments
    //fs.readFile('/etc/hosts', 'utf8', function (err,data) {
    //    if (err) throw(err)
    //    else console.log(data)
    //})

    // call-to-promise approach

    fs.readFile('/etc/hosts', 'utf8', c2p.successfn('p-id-1'))

    c2p.id('p-id-1').promise.then(function(args){

        let err = args[0]
        let data = args[1]

        if (err) throw(err)
        else console.log(data)
    })

## Nuance 1

`c2p = require('call-to-promise')` returning global object which could be used from any place and work with same promise as has been used on other place of project according to ID.

`c3p = require('call-to-promise').build()` on other side creating local object and cannot share promise with other parts of your project.

    c2p.when('id').then(console.log)
    c3p.when('id').then(console.log)

    c2p.id('id').resolve(1)
    // c2p.id('id').resolve(3) // -> it will throw an exception
    c3p.id('id').resolve(2)
    // c3p.id('id').resolve(4) // -> it will throw an exception

    // output -> 1 and 2

## Nuance 2 - multi-when

It is possible to wait for resolve of multiple promises.

    function sum(a, b, cb) { cbk(a+b) }

    c2p.when(['ab.2','ab.1','another']).then((a) => expect(a).to.eql([8,5,'test']))

    sum(1, 4, c2p.successfn('ab.1'))
    c2p.id('another').resolve('test')
    sum(3, 5, c2p.successfn('ab.2'))

## API

`c2b: promiser object`

- function id(string): deferred object
- function successfn(string): solve callback - **pointing to resolve fn from deferred**
- function failfn(string): reject callback - **pointing to reject fn from deferred**
- function when(string|array<string>): thenable object
- function build(): new promiser object

`deferred object`

- funciton isPending(): true|false
- function isSucceed(): true|false
- function isFailed(): true|false
- function isSameObjectAs(): true|false - **test if two pointer referencing same object**
- function resolve(): void - **it can pass multiple arguments, see note above**
- function reject(): void - **it can pass multiple arguments, see note above**
