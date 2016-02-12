var Promise = require('bluebird');
var utils = require('./utils');

module.exports = function (knex, nameSchema) {
    var dinamicTables = require('./dinamicTable')(knex, nameSchema);
    return {
        'createTable': function (data) {
            if (!data.tableName || !data.attributes) return Promise.reject(new Error('Objeto mal construido!!!'));
            return knex.schema.withSchema(nameSchema).createTableIfNotExists(data.tableName, function (table) {
                for (var i = 0; i < data.attributes.length; i++) {
                    var attrActual = data.attributes[i];
                    utils.createColumn(table, attrActual)
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