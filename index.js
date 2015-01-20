var parseJson = require('try-parse-json'),
    fs = require('fs'),
    stripBom = require('strip-bom');

function readJson(path, reviver, callback){
    if (arguments.length === 2) {
        callback = reviver;
        reviver = null;
    }

    fs.readFile(path, 'utf-8', function(error, data){
        if(error) {
            return callback(error);
        }

        var result =  parseJson(stripBom(data), reviver);

        if(result instanceof Error) {
            return callback(result);
        }

        callback(null, result);
    });
}

module.exports = readJson;