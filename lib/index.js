"use strict";

var _ = require('lodash');
var ajv = require('ajv')();

var schemas = {};

var set = function $set(key, schema) {

    if(!_.isPlainObject(schema)) {
        throw new Error('Non-object sent as #schema to schemap.set');
    };

    if(!_.isString(key)) {
        throw new Error('Non-string sent as #key to schemap.key');
    };

    return (schemas[key] = ajv.compile(schema));
};

var get = function $get(key) {

    return schemas[key];
};

var validate = function $validate(key, json) {

    if(!_.isPlainObject(json)) {
        throw new Error('Non-object sent as #json to schemap.validate');
    };

    if(!_.isString(key)) {
        throw new Error('Non-string sent as #key to schemap.validate');
    };

    if(!schemas[key]) {
        throw new Error('Non-existent #key sent to schemap.validate');
    };

    return schemas[key](json) ? true : schemas[key].errors;
};

module.exports = {
    set : set,
    get : get,
    validate : validate
};