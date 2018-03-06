# Loader

A minimal Javascript loader aiming to provide a pleasent (but incompatible) syntax for declaring modules.

## Example

```javascript
define(function(require, exports) {

exports(hello);

var translate = require('translate');

function hello(name) {
    return translate.german('Hello') + ' ' + name + '!';
}

});
```
