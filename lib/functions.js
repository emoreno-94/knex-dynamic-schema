var Promise = require('bluebird');
var utils = require('./utils');

module.exports = function (knex, nameSchema) {
    var dinamicTables = require('./dinamicTable')(knex, nameSchema);
    function checkTableExists(tablename) {
        return knex.raw('SELECT 1 FROM pg_catalog.pg_tables WHERE tablename=\'' + tablename  + '\' and schemaname=\'' + nameSchema + '\'')
            .then(function(resp) {
                if (resp.rows.length > 0)
                    return Promise.resolve({});
                else
                    return Promise.reject(new Error('No existe la tabla: ' + from))
            });
    }
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
            return checkTableExists(from)
                .then(function () {
                    return knex.schema.renameTable(nameSchema + '.' + from, to);
                });
        },
        'dropTable': function (tableName) {
            return knex.schema.withSchema(nameSchema).dropTableIfExists(tableName)
        },
        'table': function(tableName) {
            return dinamicTables.create(tableName);
        }
    };
};