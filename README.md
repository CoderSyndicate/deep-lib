# deep-lib

[![NPM version](https://img.shields.io/npm/v/deep-lib.svg?style=flat)](https://www.npmjs.com/package/deep-lib "View this project on NPM")
[![NPM downloads](https://img.shields.io/npm/dm/deep-lib.svg?style=flat)](https://www.npmjs.com/package/deep-lib "View this project on NPM")
[![NPM license](https://img.shields.io/npm/l/deep-lib.svg?style=flat)](https://www.npmjs.com/package/deep-lib "View this project on NPM")
[![flattr](https://img.shields.io/badge/flattr-donate-yellow.svg?style=flat)](http://flattr.com/thing/3817419/luscus-on-GitHub)

![coverage](https://rawgit.com/CoderSyndicate/deep-lib/master/reports/coverage.svg)
[![David](https://img.shields.io/david/CoderSyndicate/deep-lib.svg?style=flat)](https://david-dm.org/CoderSyndicate/deep-lib)
[![David](https://img.shields.io/david/dev/CoderSyndicate/deep-lib.svg?style=flat)](https://david-dm.org/CoderSyndicate/deep-lib#info=devDependencies)

Enables to manipulate data and its substructures using dot separated property paths and
methods to create, update, delete, select, move, search, check equality, check diff, ... (see [API.md](API.md))


## Installation

### Node Dependency

Execute following line

    npm install deep-lib --save

## Usage

All provided methods accept a `path` and/or an `offset` arguments referencing some substructure or value in the data.

- If `path` is provided, it references the object that will be processed.
- If `offset` is provided, it sets the root point in the object for the resolving of the `path` argument.

The full API documentation can be found in the [API.md](API.md)

    var deep = require('deep-lib');
    var a    = {foo: {hello: 'world'}, some: 'thing'};
    
    deep.select(a);                 // => {foo: {hello: 'world'}, some: 'thing'};
    deep.select(a, 'foo');          // => {hello: 'world'}
    deep.select(a, 'foo.hello');    // => 'world'
    deep.select(a, 'foo.bad');      // => undefined
    
    // with offset
    deep.select(a, 'hello', 'foo'); // => 'world'


-------------------
Copyright (c) 2015 Luscus (luscus.redbeard@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
