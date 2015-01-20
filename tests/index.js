var test = require('tape'),
    readJson = require('../'),
    path = require('path');


function getPath(filename) {
    return path.join(__dirname, 'data', filename);
}

test('Stringified JSON', function(t){
    var path = getPath('stringifiedJson.json'),
        expectedOutput = {a:1, b:2};

    t.plan(2);

    readJson(path, function(error, data){
        t.notOk(error, 'should not error');
        t.deepEqual(error || data, expectedOutput);
    });
});

test('Stringified JSON with BOM', function(t){
    var path = getPath('utf8BOM.json'),
        expectedOutput = {a:1, b:2};

    t.plan(2);

    readJson(path, function(error, data){
        t.notOk(error, 'should not error');
        t.deepEqual(error || data, expectedOutput);
    });
});

test('reviver', function(t) {
    var path = getPath('reviver.json'),
        reviver = function (key, value) {
            if(key === '') {
                return value;
            }
            return value / 2;
        },
        expectedOutput = { a: 5 };

    t.plan(2);

    readJson(path, reviver, function(error, data){
        t.notOk(error, 'should not error');
        t.deepEqual(error || data, expectedOutput, 'reviver function transforms data');
    });
});

test('fs error bubbles to callback', function(t){
    var path = 'not a real path',
        expectedError = 'ENOENT, open \'not a real path\'';

    t.plan(3);

    readJson(path, function(error, data) {
        t.ok(error instanceof Error, 'error is instance of Error');
        t.deepEqual(error.message, expectedError, 'Got correct error message');
        t.notOk(data, 'data should be null');
    });

});

test('invalid JSON returns error', function(t) {
    var path = getPath('invalidJson.json'),
        expectedError = 'Unexpected token ]';

    t.plan(3);

    readJson(path, function(error, data) {
        t.ok(error instanceof Error, 'error is instance of Error');
        t.deepEqual(error.message, expectedError, 'Got correct error message');
        t.notOk(data, 'data should be null');
    });

});
