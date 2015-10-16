"use strict";

var path = require('path');
var schemap = require('../../lib');

module.exports = function(test, Promise) {

    var testkey = 'testkey';
    var testSchema = require(path.resolve(__dirname, '../assets/test_schema.json'));
    var schemaSet = schemap.set(testkey, testSchema);
    var schemaGet = schemap.get(testkey);
    var goodJSON = {
        firstName: 'Jack',
        lastName: 'Spratt'
    };
    var badJSON = {
        firstName: 'Jack',
        lastName: 'Spratt',
        age: "eighteeen" // Error! Schema expects an Integer
    };

    test.ok(schemaSet, 'schema was successfully #set');

    test.equal(schemaSet, schemaGet, '#get got the same schema that was #set');

    test.equal(schemap.validate(testkey, goodJSON), true, 'valid JSON is passing');

    test.notEqual(schemap.validate(testkey, badJSON), true, 'invalid JSON is failing');

    return Promise.resolve();
};