## Members
<dl>
<dt><a href="#defaultOptions">defaultOptions</a> : <code>*</code></dt>
<dd><p>Default options use when Object.defineProperty
is called an no custom options where provided</p>
</dd>
</dl>
## Objects
<dl>
<dt><a href="#deep-lib">deep-lib</a> : <code>object</code></dt>
<dd><p>This is the singleton.</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#createPath">createPath(object, path, [root])</a></dt>
<dd><p>Creates all objects that are part of the provided path hierarchy</p>
</dd>
<dt><a href="#defineProperty">defineProperty(object, path, value, options, path)</a></dt>
<dd><p>Makes use of <a href="Object.defineProperty">Object.defineProperty</a> to create a property at the provided location</p>
</dd>
<dt><a href="#delete">delete(object, [path])</a> ⇒ <code>*</code> | <code>undefined</code></dt>
<dd><p>Deletes the referenced property and returns
its value</p>
</dd>
<dt><a href="#equal">equal(object1, object2, [path])</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks for simple equality of provided objects or
a referenced substructure</p>
</dd>
<dt><a href="#get">get(object, [path])</a> ⇒ <code>*</code></dt>
<dd><p>Returns the value referenced by the provided path
or the object itself</p>
</dd>
</dl>
## Typedefs
<dl>
<dt><a href="#DefinePropertyOptions">DefinePropertyOptions</a> : <code>Object</code></dt>
<dd><p>Options that can be applied to the property.</p>
</dd>
</dl>
<a name="defaultOptions"></a>
## defaultOptions : <code>\*</code>
Default options use when Object.defineProperty
is called an no custom options where provided

**Kind**: global variable  
<a name="deep-lib"></a>
## deep-lib : <code>object</code>
This is the singleton.

**Kind**: global namespace  
<a name="createPath"></a>
## createPath(object, path, [root])
Creates all objects that are part of the provided path hierarchy

**Kind**: global function  
**Access:** public  

| Param | Type |
| --- | --- |
| object | <code>object</code> &#124; <code>array</code> | 
| path | <code>string</code> | 
| [root] | <code>string</code> | 

<a name="defineProperty"></a>
## defineProperty(object, path, value, options, path)
Makes use of [Object.defineProperty](Object.defineProperty) to create a property at the provided location

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> &#124; <code>array</code> | root object in which depths the property will be defined |
| path | <code>string</code> | path locating the property to be created |
| value | <code>\*</code> | value to be applied to the property, undefined will be ignored |
| options | <code>[DefinePropertyOptions](#DefinePropertyOptions)</code> | Object.defineProperty options |
| path | <code>string</code> | used to rebase the root object argument before proceeding |

<a name="delete"></a>
## delete(object, [path]) ⇒ <code>\*</code> &#124; <code>undefined</code>
Deletes the referenced property and returns
its value

**Kind**: global function  
**Returns**: <code>\*</code> &#124; <code>undefined</code> - value of the deleted property or false if not found  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | source object |
| [path] | <code>string</code> | path to some substructure |

<a name="equal"></a>
## equal(object1, object2, [path]) ⇒ <code>boolean</code>
Checks for simple equality of provided objects or
a referenced substructure

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| object1 |  |  |
| object2 |  |  |
| [path] | <code>string</code> | path to some substructure |

<a name="get"></a>
## get(object, [path]) ⇒ <code>\*</code>
Returns the value referenced by the provided path
or the object itself

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | source object |
| [path] | <code>string</code> | path to some substructure |

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

<a name="clone"></a>
## .clone(object, [path]) ⇒ <code>\*</code> &#124; <code>undefined</code>
Returns a deep clone of the provided object.
If a path is provided, the method will return
a clone of the referenced substructure, property value or undefined
should the path be unknown.

**Kind**: static function  
**Returns**: <code>\*</code> &#124; <code>undefined</code> - a structure, a value or undefined  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | source object |
| [path] | <code>string</code> | path pointing to a value or a structure |

**Example**  
```js
var a = {foo: {hello: 'world'}};

var b = deep.clone(a); // => {foo: {hello: 'world'}}

var c = deep.clone(a,'foo'); // => {hello: 'world'}

var d = deep.clone(a,'foo.world'); // => 'world'
```
