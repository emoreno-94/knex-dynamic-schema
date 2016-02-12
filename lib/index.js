var Promise = require('bluebird');
var utils = require('./utils');
var dinamicTables = require('./dinamicTable');

module.exports = function (knex, nameSchema) {
    if (!nameSchema) nameSchema = 'public';
    dinamicTables(knex, nameSchema);
    return {
        'createTable': function (data) {
            if (!data.tableName) return Promise.reject(new Error('Table without name!!!'));
            return knex.schema.withSchema(nameSchema).createTableIfNotExists(data.tableName, function (table) {
                for (var i = 0; i < data.attributes.length; i++) {
                    var attrActual = data.attributes[i];
                    utils.createColumn(table, attrActual);
                }
            });
        },
        'renameTable': function (from, to) {
            return knex.schema.renameTable(nameSchema + '.' + from, to);
        },
        'dropTable': function (tableName) {
            return knex.schema.withSchema(nameSchema).dropTableIfExists(tableName)
        },
        'table': function(tableName) {
            return dinamicTables.create(tableName);
        }
    };
};