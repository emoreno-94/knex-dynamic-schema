'use strict';
var utils = require('./utils');
var Promise = require('bluebird');

module.exports = function(knex, nameSchema) {
    function createTable(name) {
        return {
            'dropColumn': function(column) {
                return knex.schema.withSchema(nameSchema).table(name, function(tableDb) {
                    tableDb.dropColumn(column);
                });
            },
            'addColumn': function(column, attr) {
                return knex.schema.withSchema(nameSchema).table(name, function(tableDb) {
                    return utils.createColumn(tableDb, column, attr)
                }).then(function() {return Promise.resolve({})});
            },
            'renameColumn': function(from, to) {
                return knex.schema.withSchema(nameSchema).table(name, function(tableDb) {
                    tableDb.renameColumn(from, to)
                });
            },
            'insert': function (objs) {
                if (!Array.isArray(objs)) objs = [objs];
                return knex(nameSchema + '.' + name).insert(objs)
            }
        }
    }
    return {
        create: createTable
    }
};