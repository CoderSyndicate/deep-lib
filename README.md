# deep-lib

[![NPM version](https://img.shields.io/npm/v/deep-lib.svg?style=flat)](https://www.npmjs.com/package/deep-lib "View this project on NPM")
[![NPM downloads](https://img.shields.io/npm/dm/deep-lib.svg?style=flat)](https://www.npmjs.com/package/deep-lib "View this project on NPM")
[![NPM license](https://img.shields.io/npm/l/deep-lib.svg?style=flat)](https://www.npmjs.com/package/deep-lib "View this project on NPM")
[![flattr](https://img.shields.io/badge/flattr-donate-yellow.svg?style=flat)](http://flattr.com/thing/3817419/luscus-on-GitHub)

![coverage](https://rawgit.com/CoderSyndicate/deep-lib/master/reports/coverage.svg)
[![David](https://img.shields.io/david/CoderSyndicate/deep-lib.svg?style=flat)](https://david-dm.org/CoderSyndicate/deep-lib)
[![David](https://img.shields.io/david/dev/CoderSyndicate/deep-lib.svg?style=flat)](https://david-dm.org/CoderSyndicate/deep-lib#info=devDependencies)

Enables to manipulate data and its substructures using dot separated property paths.


## Installation

### Node Dependency

Execute following line

    npm install deep-lib --save


### Require module

    var deep = require('deep-lib');


## Usage

All provided methods accept a `path` property referencing some substructure/value in the data.
If `path` is provided, the called method will be applied to the referenced substructure.

The full API documentation can be found in the [API.md](API.md)

### clone

Clones the referenced substructure/value.
If no `path` is provided, the whole object is cloned.

### get

Returns the referenced substructure/value or undefined if it was not found.

### defineProperty

Makes [Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) available to deep referencing.

Adds a new substructure/value to the location specified with the `path`.
If structures in the `path` do not exist, the method will create them in order to fulfil the task.



### put

Adds a new substructure/value to the location specified with the `path`.
If structures in the `path` do not exist, the method will create them in order to fulfil the task.

### update

Adds a new substructure/value to the location specified with the `path`.

### move

Moves a substructure/value to a new `path` without breaking the object reference.

### delete

Deletes the referenced property, returning its value or undefined if it was not found.

### equal

Uses the [deep-equal](https://www.npmjs.com/package/deep-equal) package.

Returns true if the compared objects strictly equals each other.

### diff

Uses the [deep-diff](https://www.npmjs.com/package/deep-diff) package.

### createPaths

Create the object hierarchy if needed.

### getPaths

Returns all available paths to all values in the object.

### tools.parent

Returns the parent part of a path (like unix dirname).

### tools.property

Returns the property part of a path (like unix basename).



-------------------
Copyright (c) 2015 Luscus (luscus.redbeard@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
