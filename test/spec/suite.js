"use strict";

var path = require('path');
var schemap = require('../../lib')();

module.exports = function(test, Promise) {

    var testkey = 'testkey';
    var testSchema = require(path.resolve(__dirname, '../assets/test_schema.json'));

    var goodJSON = {
        firstName: 'Jack',
        lastName: 'Spratt'
    };
    var badJSON = {
        firstName: 'Jack',
        lastName: 'Spratt',
        age: "eighteeen" // Error! Schema expects an Integer
    };

    // Test against all validators
    //
    ['ajv','jsen','isMyJSONValid'].forEach(function(validator) {

        schemap.use(validator)

        var schemaSet = schemap.set(testkey, testSchema);
        var schemaGet = schemap.get(testkey);

        test.ok(schemaSet, 'schema was successfully #set using -> ' + validator);

        test.equal(schemaSet, schemaGet, '#get got the same schema that was #set using -> ' + validator);

        test.equal(schemap.validate(testkey, goodJSON), true, 'valid JSON is passing using -> ' + validator);

        test.notEqual(schemap.validate(testkey, badJSON), true, 'invalid JSON is failing using -> ' + validator);
    })

    // Test API call signature error handling
    //

    // #set
    //
    test.throws(function() {
        schemap.set('foo', 2)
    }, 'Schemap throws if non-object schema sent to #set');

    test.throws(function() {
        schemap.set(1, {})
    }, 'Schemap throws if non-string key sent to #set');

    // #get
    //
    test.throws(function() {
        schemap.get('foo')
    }, 'Schemap throws if non-existent key sent to #get');

    // #use
    //
    test.equal(schemap.use('foo'), false, 'Schemap returns false on unrecognized validator name');

    test.equal(schemap.use('ajv'), true, 'Schemap returns true on recognized validator name');

    // #validate
    //
    test.throws(function() {
        schemap.validate('foo', 2)
    }, 'Schemap throws if non-object schema sent to #validate');

    test.throws(function() {
        schemap.validate(1, {})
    }, 'Schemap throws if non-string key sent to #validate');

    test.throws(function() {
        schemap.validate('foo', {})
    }, 'Schemap throws if non-existent key sent to #validate');

    return Promise.resolve();
};