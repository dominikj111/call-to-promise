<!-- markdownlint-disable MD041 -->

[![GitHub version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=gh&type=6&v=2.0.7&x2=0)](https://d25lcipzij17d.cloudfront.net/badge.svg?id=gh&type=6&v=2.0.7&x2=0)
[![Coverage Status](https://coveralls.io/repos/boennemann/badges/badge.svg)](https://coveralls.io/r/boennemann/badges)
[![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)](https://github.com/dwyl/goodparts 'JavaScript The Good Parts')
[![dependency status](https://deps.rs/crate/autocfg/1.1.0/status.svg)](https://deps.rs/crate/autocfg/1.1.0)

# call-to-promise

A lightweight, production-ready, universal library for transforming callback-style functions into Promise-based ones. Works seamlessly across Node.js, Deno, and browsers.

> **📌 Maintenance Status**: This library is in maintenance mode. It is well-written, thoroughly tested, and production-ready. Modern JavaScript provides built-in solutions for most promise-related use cases. However, this library remains a reliable choice with zero dependencies (thus zero vulnerabilities) if you need its specific ID-based promise storage feature. While no new features are being developed, bug reports are monitored and fixes are provided when needed.

## Features

- 🌐 **Universal Compatibility**: Works in Node.js, Deno, and browsers
- 🔒 **Type Safety**: Full TypeScript support with type definitions
- 🎯 **Zero Dependencies**: Lightweight and self-contained
- 🔄 **Promise Chaining**: Full support for Promise chaining and async/await
- 📦 **Multiple Module Formats**: UMD and ES Module bundles available
- ✅ **Production Ready**: Battle-tested and fully covered with tests

## Installation

### NPM/Yarn

```bash
npm install call-to-promise
# or
yarn add call-to-promise
```

### Browser

```html
<!-- UMD Bundle -->
<script src="path/to/dist/umd.min.js"></script>

<!-- ES Module -->
<script type="module">
  import * as c2p from 'path/to/dist/module.min.mjs';
</script>
```

### Deno

```javascript
import * as c2p from 'path/to/dist/module.min.mjs';
```

## Usage

### Basic Example

```javascript
const c2p = require('call-to-promise'); // or import for ES modules

function add(a, b, callback) {
  callback(a + b);
}

// Convert callback to promise
add(3, 4, c2p.successfn('add-result'));
c2p.when('add-result').then(console.log); // -> 7
```

### Multiple Arguments

```javascript
function calculate(a, b, callback) {
  callback(a + b, a * b, a - b);
}

calculate(3, 4, c2p.successfn('calc'));
c2p.when('calc').then(console.log); // -> { '0': 7, '1': 12, '2': -1 }
```

### File System Example (Node.js)

```javascript
const c2p = require('call-to-promise');
const fs = require('fs');

fs.readFile('/etc/hosts', 'utf8', c2p.successfn('read-file'));

c2p.when('read-file').then(([err, data]) => {
  if (err) throw err;
  console.log(data);
});
```

### Multiple Promises

```javascript
c2p
  .when(['promise1', 'promise2', 'promise3'])
  .then((results) => console.log(results));
```

### Local vs Global Instance

```javascript
// Global instance (shared across modules)
const c2p = require('call-to-promise');

// Local instance (isolated)
const localC2p = require('call-to-promise').build();
```

## Modern Alternatives

While this library remains reliable, here are modern approaches to handle similar scenarios:

### 1. Using Node.js util.promisify

```javascript
const { promisify } = require('util');
const fs = require('fs');

// Convert callback-based function to promise-based
const readFileAsync = promisify(fs.readFile);

// Use it
async function readConfig() {
  try {
    const data = await readFileAsync('/etc/hosts', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

### 2. Using Promise Constructor

```javascript
function promisifyFunction(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}

// Example usage
const readFilePromise = promisifyFunction(fs.readFile);
readFilePromise('/etc/hosts', 'utf8').then(console.log).catch(console.error);
```

### 3. Modern APIs (Already Promise-based)

```javascript
// Modern Web APIs are already promise-based
fetch('https://api.example.com/data')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// Modern Node.js APIs often provide promise versions
const { readFile } = require('fs/promises');
readFile('/etc/hosts', 'utf8').then(console.log).catch(console.error);
```

### When to Use This Library?

- You need to store and manage promises by ID
- You're working with legacy callback-based code and need a consistent way to handle promise creation and storage
- You want a zero-dependency solution that works across all JavaScript environments

## API Reference

### Main Functions

- `successfn(id: string)`: Creates a success callback for the given ID
- `failfn(id: string)`: Creates a failure callback for the given ID
- `when(id: string | string[])`: Returns a Promise for the given ID(s)
- `id(id: string)`: Returns the deferred object for direct manipulation
- `build()`: Creates a new local instance

### Deferred Object Methods

- `isPending()`: Checks if the promise is pending
- `isSucceed()`: Checks if the promise is fulfilled
- `isFailed()`: Checks if the promise is rejected
- `resolve(value)`: Resolves the promise
- `reject(error)`: Rejects the promise

## 📄 License

Apache-2.0 © dominikj111

This library is licensed under the Apache License, Version 2.0. You may obtain a copy of the License at
<http://www.apache.org/licenses/LICENSE-2.0>
