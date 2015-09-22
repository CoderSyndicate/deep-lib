## Members
<dl>
<dt><a href="#defaultOptions">defaultOptions</a> : <code>*</code></dt>
<dd><p>Default options use when Object.defineProperty
is called an no custom options where provided</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#defineProperty">defineProperty(object, path, value, options, path)</a></dt>
<dd><p>Makes use of <a href="Object.defineProperty">Object.defineProperty</a> to create a property at the provided location</p>
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

