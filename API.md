## Objects
<dl>
<dt><a href="#deep-lib">deep-lib</a> : <code>object</code></dt>
<dd><p>Enables to manipulate data and its substructures using dot separated property paths.</p>
<p>All provided methods accept a <code>path</code> and/or an <code>offset</code> arguments referencing some substructure/value in the data.</p>
<ul>
<li>If <code>offset</code> is provided, object will be rebased to the referenced subobject that will become the processing subject.</li>
<li>If <code>path</code> is provided, it references the object that will be processed. If <code>offset</code> was also provided, it is the starting point of the <code>path</code>.</li>
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

All provided methods accept a `path` and/or an `offset` arguments referencing some substructure/value in the data.
- If `offset` is provided, object will be rebased to the referenced subobject that will become the processing subject.
- If `path` is provided, it references the object that will be processed. If `offset` was also provided, it is the starting point of the `path`.

**Kind**: global namespace  

* [deep-lib](#deep-lib) : <code>object</code>
  * [.tools](#deep-lib.tools) : <code>object</code>
    * [.parent(path)](#deep-lib.tools.parent) ⇒ <code>string</code>
    * [.property(path)](#deep-lib.tools.property) ⇒ <code>string</code>
  * [.clone(object, [offset])](#deep-lib.clone) ⇒ <code>\*</code> &#124; <code>undefined</code>
  * [.createPath(object, path, [offset])](#deep-lib.createPath)
  * [.defineProperty(object, path, value, [options], [offset])](#deep-lib.defineProperty)
  * [.delete(object, path)](#deep-lib.delete) ⇒ <code>\*</code> &#124; <code>undefined</code>
  * [.diff(object1, object2, [offset])](#deep-lib.diff)
  * [.equal(object1, object2, [offset])](#deep-lib.equal) ⇒ <code>boolean</code>
  * [.get(object, [path])](#deep-lib.get) ⇒ <code>\*</code>
  * [.createPath(object, path)](#deep-lib.createPath) ⇒ <code>Array</code>
  * [.move(object, oldPath, newPath)](#deep-lib.move)
  * [.put(object, path, value)](#deep-lib.put)
  * [.select(object, regex, [offset])](#deep-lib.select) ⇒ <code>Array</code>
  * [.update(object, path, value)](#deep-lib.update)

<a name="deep-lib.tools"></a>
### deep-lib.tools : <code>object</code>
**Kind**: static namespace of <code>[deep-lib](#deep-lib)</code>  

* [.tools](#deep-lib.tools) : <code>object</code>
  * [.parent(path)](#deep-lib.tools.parent) ⇒ <code>string</code>
  * [.property(path)](#deep-lib.tools.property) ⇒ <code>string</code>

<a name="deep-lib.tools.parent"></a>
#### tools.parent(path) ⇒ <code>string</code>
**Kind**: static method of <code>[tools](#deep-lib.tools)</code>  
**Access:** public  

| Param |
| --- |
| path | 

<a name="deep-lib.tools.property"></a>
#### tools.property(path) ⇒ <code>string</code>
**Kind**: static method of <code>[tools](#deep-lib.tools)</code>  
**Access:** public  

| Param |
| --- |
| path | 

<a name="deep-lib.clone"></a>
### deep-lib.clone(object, [offset]) ⇒ <code>\*</code> &#124; <code>undefined</code>
Returns a deep clone of the provided object.
If a path is provided, the method will return
a clone of the referenced substructure, property value or undefined
should the path be unknown.

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Returns**: <code>\*</code> &#124; <code>undefined</code> - a structure, a value or undefined  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | object to be cloned |
| [offset] | <code>string</code> | path used to rebase the processed object to the referenced subobject |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}};

var b    = deep.clone(a); // => {foo: {hello: 'world'}}

var c    = deep.clone(a,'foo'); // => {hello: 'world'}

var d    = deep.clone(a,'foo.world'); // => 'world'
```
<a name="deep-lib.createPath"></a>
### deep-lib.createPath(object, path, [offset])
Creates all objects that are part of the provided path hierarchy if they are missing.
Paths can combine objects and arrays. On each path depth an Object
or an Array will be created accordingly.

Arrays are referenced using either: one of the wildcards (*, >*, *<), or an index

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  
**Todo**

- [ ] should return the created path


| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | object into which the path will be created |
| path | <code>string</code> | the object hierarchy to be created |
| [offset] | <code>string</code> | path used to rebase the processed object to the referenced subobject |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}};

deep.createPath(a, 'bar'); // => {foo: {hello: 'world'}, bar:{}}
deep.createPath(a, 'bar.*'); // => {foo: {hello: 'world'}, bar:[]}
deep.createPath(a, 'bar.0'); // => {foo: {hello: 'world'}, bar:[]}
deep.createPath(a, 'bar.*.world'); // => {foo: {hello: 'world'}, bar:[{world:{}}]}
deep.createPath(a, 'bar.*.*.world'); // => {foo: {hello: 'world'}, bar:[[{world:{}}]]}

// used with offset
deep.createPath(a, 'bar.*.*.world', 'foo'); // => {foo: {hello: 'world', bar:[[{world:{}}]]}}
```
<a name="deep-lib.defineProperty"></a>
### deep-lib.defineProperty(object, path, value, [options], [offset])
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
| [offset] | <code>string</code> | path used to rebase the processed object to the referenced subobject |

**Example**  
```js
var deep = require('deep-lib');
var a    = {foo: {hello: 'world'}};

deep.defineProperty(a, 'bar', 42); // => {foo: {hello: 'world'}, bar:42}
deep.defineProperty(a, 'bar.*', 42); // => {foo: {hello: 'world'}, bar:[42]}
deep.defineProperty(a, 'bar.0', 42); // => {foo: {hello: 'world'}, bar:[42]}
deep.defineProperty(a, 'bar.*.world', 42); // => {foo: {hello: 'world'}, bar:[{world:42}]}
deep.defineProperty(a, 'bar.*.*.world', 42); // => {foo: {hello: 'world'}, bar:[[{world:42}]]}

// used with offset
deep.defineProperty(a, 'bar.*.*.world', 42, 'foo'); // same as above

// used with options
deep.defineProperty(a, 'bar.*.*.world', 42, {writable:true}, 'foo'); // same as above
```
<a name="deep-lib.delete"></a>
### deep-lib.delete(object, path) ⇒ <code>\*</code> &#124; <code>undefined</code>
Deletes the referenced property and returns its value

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Returns**: <code>\*</code> &#124; <code>undefined</code> - value of the deleted property or false if not found  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> &#124; <code>array</code> | object into which the property will be deleted |
| path | <code>string</code> | path referencing the property to be deleted |

<a name="deep-lib.diff"></a>
### deep-lib.diff(object1, object2, [offset])
**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object1 |  |  |
| object2 |  |  |
| [offset] | <code>string</code> | path used to rebase the processed object to the referenced subobject |

<a name="deep-lib.equal"></a>
### deep-lib.equal(object1, object2, [offset]) ⇒ <code>boolean</code>
Checks for simple equality of provided objects or
a referenced substructure

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object1 |  |  |
| object2 |  |  |
| [offset] | <code>string</code> | path used to rebase the processed object to the referenced subobject |

<a name="deep-lib.get"></a>
### deep-lib.get(object, [path]) ⇒ <code>\*</code>
Returns the value referenced by the provided path
or the object itself

**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | source object |
| [path] | <code>string</code> | path to some substructure |

<a name="deep-lib.createPath"></a>
### deep-lib.createPath(object, path) ⇒ <code>Array</code>
**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  

| Param |
| --- |
| object | 
| path | 

<a name="deep-lib.move"></a>
### deep-lib.move(object, oldPath, newPath)
**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  

| Param |
| --- |
| object | 
| oldPath | 
| newPath | 

<a name="deep-lib.put"></a>
### deep-lib.put(object, path, value)
**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  

| Param |
| --- |
| object | 
| path | 
| value | 

<a name="deep-lib.select"></a>
### deep-lib.select(object, regex, [offset]) ⇒ <code>Array</code>
**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object |  |  |
| regex |  |  |
| [offset] | <code>string</code> | path used to rebase the processed object to the referenced subobject |

<a name="deep-lib.update"></a>
### deep-lib.update(object, path, value)
**Kind**: static method of <code>[deep-lib](#deep-lib)</code>  
**Access:** public  

| Param |
| --- |
| object | 
| path | 
| value | 

<a name="DefinePropertyOptions"></a>
## DefinePropertyOptions : <code>Object</code>
Options that can be applied to the property.

**Kind**: global typedef  
**See**

- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| configurable | <code>boolean</code> | <code>false</code> | true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object. |
| enumerable | <code>boolean</code> | <code>false</code> | true if and only if this property shows up during enumeration of the properties on the corresponding object. |
| value | <code>\*</code> |  | The value associated with the property. Can be any valid JavaScript value (number, object, function, etc). |
| writable | <code>boolean</code> | <code>false</code> | true if and only if the value associated with the property may be changed with an assignment operator. |
| get | <code>function</code> |  | A function which serves as a getter for the property, or undefined if there is no getter. The function return will be used as the value of property. |
| set | <code>function</code> |  | A function which serves as a setter for the property, or undefined if there is no setter. The function will receive as only argument the new value being assigned to the property. |

