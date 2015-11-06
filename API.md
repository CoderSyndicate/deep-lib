## Objects
<dl>
<dt><a href="#deep-lib">deep-lib</a> : <code>object</code></dt>
<dd><p>Enables to manipulate data and its substructures using dot separated property paths.</p>
<p>All provided methods accept a <code>path</code> and/or an <code>offset</code> arguments referencing some substructure or value in the data.</p>
<ul>
<li>If <code>path</code> is provided, it references the object that will be processed.</li>
<li>If <code>offset</code> is provided, it sets the root point in the object for the resolving of the <code>path</code> argument.</li>
</ul>
</dd>
</dl>
## Typedefs
<dl>
<dt><a href="#DefinePropertyOptions">DefinePropertyOptions</a> : <code>Object</code></dt>
<dd><p>Options that can be applied to the property.</p>
</dd>
</dl>
<a name="deep-lib"></a>
## deep-lib : <code>object</code>
Enables to manipulate data and its substructures using dot separated property paths.

All provided methods accept a `path` and/or an `offset` arguments referencing some substructure or value in the data.
- If `path` is provided, it references the object that will be processed.
- If `offset` is provided, it sets the root point in the object for the resolving of the `path` argument.

**Kind**: global namespace  
**Example**  
```js
// path: 'foo'
// ↙root ↙referenced substructure
  {foo: {hello: 'world'}, hello: 'Mundo'};

// path: 'hello'
// ↙root                          ↙referenced value
  {foo: {hello: 'world'}, hello: 'Mundo'};

// path: 'foo.hello'
// ↙root         ↙referenced value
  {foo: {hello: 'world'}, hello: 'Mundo'};

// path: 'hello' & offset: 'foo'
//       ↙root   ↙referenced value
  {foo: {hello: 'world'}, hello: 'Mundo'};
```

* [deep-lib](#deep-lib) : <code>object</code>
  * [.tools](#deep-lib.tools) : <code>object</code>
    * [.parent(path)](#deep-lib.tools.parent) ⇒ <code>string</code> &#124; <code>null</code>
    * [.property(path)](#deep-lib.tools.property) ⇒ <code>string</code>
  * [.clone(object, [offset])](#deep-lib.clone) ⇒ <code>\*</code> &#124; <code>undefined</code>
  * [.create(object, path, value, [offset], [force])](#deep-lib.create) ⇒ <code>string</code>
  * [.createPath(object, path, [offset], [force])](#deep-lib.createPath)
  * [.define(object, path, value, [options], [offset])](#deep-lib.define)
  * [.delete(object, path, [offset])](#deep-lib.delete) ⇒ <code>\*</code> &#124; <code>undefined</code>
  * [.diff(object1, object2, [offset])](#deep-lib.diff) ⇒ <code>Array.&lt;object&gt;</code> &#124; <code>undefined</code>
  * [.equal(object1, object2, [offset])](#deep-lib.equal) ⇒ <code>boolean</code>
  * [.getPaths(object, [offset])](#deep-lib.getPaths) ⇒ <code>Array.&lt;string&gt;</code>
  * [.move(object, oldPath, newPath, [offset])](#deep-lib.move)
  * [.search(object, regex, [offset])](#deep-lib.search) ⇒ <code>Array.&lt;string&gt;</code>
  * [.select(object, [path], [offset])](#deep-lib.select) ⇒ <code>\*</code> &#124; <code>undefined</code>
  * [.update(object, path, value, [offset], [ignoreUnknownProperties])](#deep-lib.update)

<a name="deep-lib.tools"></a>
### deep-lib.tools : <code>object</code>
**Kind**: static namespace of <code>[deep-lib](#deep-lib)</code>  

* [.tools](#deep-lib.tools) : <code>object</code>
  * [.parent(path)](#deep-lib.tools.parent) ⇒ <code>string</code> &#124; <code>null</code>
  * [.property(path)](#deep-lib.tools.property) ⇒ <code>string</code>

<a name="deep-lib.tools.parent"></a>
#### tools.parent(path) ⇒ <code>string</code> &#124; <code>null</code>
Retrieve the parent part of the provided path.

**Kind**: static method of <code>[tools](#deep-lib.tools)</code>  
**Returns**: <code>string</code> &#124; <code>null</code> - the parent path or null if no deep reference was provided  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the path to be processed |

**Example**  
```js
var deep = require('deep-lib');

deep.tools.parent('path.to.deep.property'); // => 'path.to.deep'
deep.tools.parent('path.to.0.property');    // => 'path.to.0'
deep.tools.parent('property');              // no deep reference => null
```
<a name="deep-lib.tools.property"></a>
#### tools.property(path) ⇒ <code>string</code>
Retrieve the property name from the provided path.

**Kind**: static method of <code>[tools](#deep-lib.tools)</code>  
**Returns**: <code>string</code> - the property name  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the path to be processed |

**Example**  
```js
var deep = require('deep-lib');

deep.tools.property('path.to.deep.property'); // => 'property'
deep.tools.property('path.to.0.property');    // => 'property'
deep.tools.property('property');              // => 'property'
```
<a name="deep-lib.clone"></a>
### deep-lib.clone(object, [offset]) ⇒ <code>\*</code> &#124; <code>undefined</code>
Returns a deep clone of the provided object.
If a `offset` is provided, the method will return
a clone of the referenced substructure, property value or undefined
should the path be unknown.

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Returns**: <code>\*</code> &#124; <code>undefined</code> - a structure, a value or undefined  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | object to be cloned |
| [offset] | <code>string</code> | path used to rebase processing to the referenced substructure |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}};

var b    = deep.clone(a);             // => {foo: {hello: 'world'}}
var c    = deep.clone(a,'foo');       // => {hello: 'world'}
var d    = deep.clone(a,'foo.world'); // => 'world'
```
<a name="deep-lib.create"></a>
### deep-lib.create(object, path, value, [offset], [force]) ⇒ <code>string</code>
Creates/updates a new property/value pair in the parent object,
if the path elements do not exist, the method will take
care of their creation calling [createPath](#deep-lib.createPath).

The method will do nothing if the provided value is equal to "undefined"

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Returns**: <code>string</code> - the newly created path  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>object</code> |  | parent object |
| path | <code>string</code> |  | path to the property, starting at the object root |
| value | <code>\*</code> |  | value to be assigned to the created property |
| [offset] | <code>string</code> |  | path used to rebase processing to the referenced substructure |
| [force] | <code>boolean</code> | <code>false</code> | forces the method to change objects in arrays or vice versa to comply to the provided path |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}};

deep.create(a, 'ciao', 'mondo'); // create => {foo: {hello: 'world'}, ciao: 'mondo',};
deep.create(a, 'foo.hello', 'mundo'); // update => {foo: {hello: 'mundo'}, some: 'thing'};
deep.create(a, 'some.deep.path.hallo', 'Welt'); // deep create => {foo: {hello: 'world'}, some: {deep: {path: {hallo: 'Welt'}}}};
```
<a name="deep-lib.createPath"></a>
### deep-lib.createPath(object, path, [offset], [force])
Creates, if needed, all objects that are part of the provided path hierarchy.
Paths can combine objects and arrays. On each path depth an Object
or an Array will be created accordingly.

Arrays are referenced using either: one of the wildcards "\*+" (push), "\*" (push), or an integer.
If they are the last depth in the path, a null value will be placed at the specified index or added per push to the array.

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  
**Todo**

- [ ] should return the created path


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>object</code> &#124; <code>Array.&lt;object&gt;</code> |  | object into which the path will be created |
| path | <code>string</code> |  | the object hierarchy to be created |
| [offset] | <code>string</code> |  | path used to rebase processing to the referenced substructure |
| [force] | <code>boolean</code> | <code>false</code> | forces the method to change objects in arrays or vice versa to comply to the provided path |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}};

deep.createPath(a, 'bar');           // => {foo: {hello: 'world'}, bar:{}}
deep.createPath(a, 'bar.some.deep.property'); // => {foo: {hello: 'world'}, bar:{some:{deep:{property:{}}

Used with Arrays:
deep.createPath(a, '*');             // => [null]
deep.createPath(a, '*.bar.*');       // => [{bar:[null]}]
deep.createPath(a, 'bar.*');         // => {foo: {hello: 'world'}, bar:[null]}
deep.createPath(a, 'bar.0');         // => {foo: {hello: 'world'}, bar:[null]}
deep.createPath(a, 'bar.*.world');   // => {foo: {hello: 'world'}, bar:[{world:{}}]}
deep.createPath(a, 'bar.*.*.world'); // => {foo: {hello: 'world'}, bar:[[{world:{}}]]}


Used with offset:
deep.createPath(a,     'bar.*.*.world', 'foo'); // => {foo: {hello: 'world', bar:[[{world:{}}]]}}
deep.createPath(a.foo, 'bar.*.*.world');        // => same as above
```
<a name="deep-lib.define"></a>
### deep-lib.define(object, path, value, [options], [offset])
Makes use of [Object.defineProperty](Object.defineProperty) to create a property at the provided location

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  
**Todo**

- [ ] should return the created path


| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> &#124; <code>array</code> | object into which the property will be defined |
| path | <code>string</code> | path referencing the property to be created |
| value | <code>\*</code> | value to be applied to the property, if undefined nothing will be done |
| [options] | <code>[DefinePropertyOptions](#DefinePropertyOptions)</code> | Object.defineProperty options |
| [offset] | <code>string</code> | path used to rebase processing to the referenced substructure |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}};

deep.define(a, 'bar', 42); // => {foo: {hello: 'world'}, bar:42}
deep.define(a, 'bar.*', 42); // => {foo: {hello: 'world'}, bar:[42]}
deep.define(a, 'bar.0', 42); // => {foo: {hello: 'world'}, bar:[42]}
deep.define(a, 'bar.*.world', 42); // => {foo: {hello: 'world'}, bar:[{world:42}]}
deep.define(a, 'bar.*.*.world', 42); // => {foo: {hello: 'world'}, bar:[[{world:42}]]}

// used with offset
deep.define(a, 'bar.*.*.world', 42, 'foo'); // => {foo: {hello: 'world', bar:[[{world:42}]] }}

// used with property options
deep.define(a, 'bar.*.*.world', 42, {writable:true}, 'foo'); // same as above
```
<a name="deep-lib.delete"></a>
### deep-lib.delete(object, path, [offset]) ⇒ <code>\*</code> &#124; <code>undefined</code>
Deletes the referenced property and returns its value

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Returns**: <code>\*</code> &#124; <code>undefined</code> - value of the deleted property or false if not found  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> &#124; <code>array</code> | object into which the property will be deleted |
| path | <code>string</code> | path referencing the property to be deleted |
| [offset] | <code>string</code> | path used to rebase processing to the referenced substructure |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}, some: 'thing'};

deep.delete(a, 'some'); // => {foo: {hello: 'world'}}
deep.delete(a, 'foo'); // => {some: 'thing'}
```
<a name="deep-lib.diff"></a>
### deep-lib.diff(object1, object2, [offset]) ⇒ <code>Array.&lt;object&gt;</code> &#124; <code>undefined</code>
Makes use of the [deep-diff](https://www.npmjs.com/package/deep-diff) package to return
the differences between 2 objects in JSON format. It generates a patch format that could be applied
to another object, or reverted later on.

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Returns**: <code>Array.&lt;object&gt;</code> &#124; <code>undefined</code> - returns a diff object or `undefined` if both object are deeply equal  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object1 |  | reference object, all differences are expressed in relation to it |
| object2 |  | comparison object |
| [offset] | <code>string</code> | path used to rebase processing to the referenced substructure |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}, some: 'thing'};
var b    = {foo: {hello: 'world'}};

deep.diff(a, b); // unequal => [{"kind": "D","path": ["some"],"rhs": "thing"}]
deep.diff(a, b, 'foo'); // equal => undefined
```
<a name="deep-lib.equal"></a>
### deep-lib.equal(object1, object2, [offset]) ⇒ <code>boolean</code>
Makes use of the [deep-equal](https://www.npmjs.com/package/deep-equal) package to return
whether 2 objects are deeply equal or not.

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Returns**: <code>boolean</code> - if objects are equal `true` if unequal `false`  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object1 |  |  |
| object2 |  |  |
| [offset] | <code>string</code> | path used to rebase processing to the referenced substructure |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}, some: 'thing'};
var b    = {foo: {hello: 'world'}};

deep.equal(a, b); // unequal => false
deep.equal(a, b, 'foo'); // equal => true
```
<a name="deep-lib.getPaths"></a>
### deep-lib.getPaths(object, [offset]) ⇒ <code>Array.&lt;string&gt;</code>
Crawls through an object to generate a list of all path pointing to a property value pair.
It lists all paths fully, ignoring the disabled `enumerable` option that some properties might have.

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Returns**: <code>Array.&lt;string&gt;</code> - a list of all paths found in the provided object  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object |  | object to be crawled |
| [offset] | <code>string</code> | path used to rebase processing to the referenced substructure |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}, some: 'thing'};

deep.getPaths(a); // => ['foo.hello', 'some']
deep.getPaths(a, 'foo'); // => ['hello']
```
<a name="deep-lib.move"></a>
### deep-lib.move(object, oldPath, newPath, [offset])
Moves a property or subobject within the provided object

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> &#124; <code>array</code> | object to be changed |
| oldPath | <code>string</code> | path to the old property |
| newPath | <code>string</code> | path to the new property |
| [offset] | <code>string</code> | path used to rebase processing to the referenced substructure |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}, some: 'thing'};

deep.move(a, 'some', 'foo.some'); // => {foo: {hello: 'world', some: 'thing'}};
deep.move(a, 'some', 'foo.hello.world'); // => {foo: {hello: {world: 'thing'}}};
```
<a name="deep-lib.search"></a>
### deep-lib.search(object, regex, [offset]) ⇒ <code>Array.&lt;string&gt;</code>
Iterates through all paths found in the object
and returns an Array of paths matching the provided regular expression

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Returns**: <code>Array.&lt;string&gt;</code> - an array of strings or an empty array if no match was found  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Object to be searched |
| regex | <code>RegExp</code> | a regular expression |
| [offset] | <code>string</code> | path used to rebase processing to the referenced substructure |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}, some: 'thing'};

deep.search(a, /.* /); // => ['foo.hello', 'some']
deep.search(a, /.*lo$/); // => ['foo.hello'];
deep.search(a, /\d+/); // no match => []
```
<a name="deep-lib.select"></a>
### deep-lib.select(object, [path], [offset]) ⇒ <code>\*</code> &#124; <code>undefined</code>
Returns the value referenced by the provided path
or `undefined` if some element of the path does not exist

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Returns**: <code>\*</code> &#124; <code>undefined</code> - the referenced value or `undefined`  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | source object |
| [path] | <code>string</code> | path to some substructure, array wildcards are not allowed in it |
| [offset] | <code>string</code> | path used to rebase processing to the referenced substructure |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}, some: 'thing'};

deep.select(a); // => {foo: {hello: 'world'}, some: 'thing'};
deep.select(a, 'foo'); // => {hello: 'world'}
deep.select(a, 'foo.hello'); // => 'world'
deep.select(a, 'foo.bad'); // => undefined

// with offset
deep.select(a, 'hello', 'foo'); // => 'world'
```
<a name="deep-lib.update"></a>
### deep-lib.update(object, path, value, [offset], [ignoreUnknownProperties])
Updates a property/value pair in the parent object,
if the path elements does not exist, the method will throw an error.

The method will do nothing if the provided value is `undefined`

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>object</code> |  | parent object |
| path | <code>string</code> |  | path to the property, starting at the object root |
| value | <code>\*</code> |  | value to be assigned to the created property |
| [offset] | <code>string</code> |  | path used to rebase processing to the referenced substructure |
| [ignoreUnknownProperties] | <code>boolean</code> | <code>false</code> | if set to true, update will ignore errors caused by unknown properties and fail silently |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}, bar: ['one', 'two']};

deep.update(a, 'foo.hallo');              // no value         => no change;
deep.update(a, 'foo.hallo', 'developer'); // update           => success;
deep.update(a, 'bar.1', 'mundo');         // update           => success;
deep.update(a, 'bar.*', 'mundo');         // array wildcard   => error;
deep.update(a, 'ciao', 'mondo');          // unknown property => error;
deep.update(a, 'ciao', 'mondo', true);    // unknown property => silent fail, no change;
```
<a name="DefinePropertyOptions"></a>
## DefinePropertyOptions : <code>Object</code>
Options that can be applied to the property.

**Kind**: global typedef  
**See**: {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description}  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| configurable | <code>boolean</code> | <code>false</code> | true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object. |
| enumerable | <code>boolean</code> | <code>false</code> | true if and only if this property shows up during enumeration of the properties on the corresponding object. |
| value | <code>\*</code> |  | The value associated with the property. Can be any valid JavaScript value (number, object, function, etc). |
| writable | <code>boolean</code> | <code>false</code> | true if and only if the value associated with the property may be changed with an assignment operator. |
| get | <code>function</code> |  | A function which serves as a getter for the property, or undefined if there is no getter. The function return will be used as the value of property. |
| set | <code>function</code> |  | A function which serves as a setter for the property, or undefined if there is no setter. The function will receive as only argument the new value being assigned to the property. |

