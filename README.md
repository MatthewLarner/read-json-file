### read-json-file

Read and parse a JSON file asynchronously using a callback.

### Usage

```javascript
var readJson = require('read-json-file');

readJSON(pathToYourJson, function(error, data){
    if (error) {
        throw error;
    }
    console.log(data);
});
```

### Errors

Returns any fs or Json.Parse() errors.

### Byte order markers

Byte order markers are striped before parsing.
