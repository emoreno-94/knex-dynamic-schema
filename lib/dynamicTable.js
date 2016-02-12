'use strict';
var utils = require('./utils');
var Promise = require('bluebird');

module.exports = function(knex, nameSchema) {
    function create(name) {
        var ret = knex(nameSchema + '.' + name);
        ret.dropColumn = function(column) {
            return knex.schema.withSchema(nameSchema).table(name, function(tableDb) {
                tableDb.dropColumn(column);
            });
        };
        ret.addColumn = function(data) {
            return knex.schema.withSchema(nameSchema).table(name, function(tableDb) {
                return utils.createColumn(tableDb, data)
            }).then(function() {return Promise.resolve({})});
        };
        ret.renameColumn = function(from, to) {
            return knex.schema.withSchema(nameSchema).table(name, function(tableDb) {
                tableDb.renameColumn(from, to)
            });
        };
        ret.insert = function (objs) {
            if (!Array.isArray(objs)) objs = [objs];
            return knex(nameSchema + '.' + name).insert(objs)
        };
        return ret;
    }

    return {
        'create': create
    }
};