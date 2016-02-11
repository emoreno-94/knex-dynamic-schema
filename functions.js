var Promise = require('bluebird');
var utils = require('./utils');

var dinamicTables;
var tables;

function getTables(knex, nameSchema) {
    if (!tables) {
        tables = {};
        return knex.raw('SELECT schemaname, tablename FROM pg_catalog.pg_tables')
            .then(function(resp) {
                resp.rows.map(function(row) {
                    if (row.schemaname === nameSchema)
                        tables[row.tablename] = dinamicTables.create(row.tablename);
                });
                return Promise.resolve({});
            });
    } else {
        return Promise.resolve({});
    }
}

module.exports = function (knex, nameSchema) {
    dinamicTables = require('./dinamicTable')(knex, nameSchema);
    return {
        'createTable': function (data) {
            return getTables(knex, nameSchema)
                .then(function () {
                    if (tables[data.tableName]){
                        return Promise.resolve({});
                    } else {
                        return knex.schema.withSchema(nameSchema).createTable(data.tableName, function (table) {
                            tables[data.tableName] = dinamicTables.create(data.tableName);
                            for (var attrName in data.attributes) {
                                utils.createColumn(table, attrName, data.attributes[attrName])
                            }
                        });
                    }
                })
        },
        'renameTable': function (from, to) {
            return getTables(knex, nameSchema)
                .then(function () {
                    return knex.schema.withSchema(nameSchema).renameTable(from, to);
                })
        },
        'dropTable': function (tableName) {
            return getTables(knex, nameSchema)
                .then(function () {
                    return knex.schema.withSchema(nameSchema).dropTable(tableName)
                }).then(function () {
                    tables[tableName] = null;
                    return Promise.resolve();
                })
        },
        'table': function(tableName) {
            var realTable = getTables(knex, nameSchema)
                .then(function () {
                    return Promise.resolve(tables[tableName])
                });
            return {
                dropColumn: function (colName) {
                    return realTable.then(function (table) {
                        return table.dropColumn(colName);
                    })
                },
                addColumn: function (columnName, attr) {
                    return realTable.then(function (table) {
                        return table.addColumn(columnName, attr);
                    })
                },
                renameColumn: function (from, to) {
                    return realTable.then(function (table) {
                        return table.renameColumn(from, to);
                    })
                },
                insert: function (objs) {
                    return realTable.then(function (table) {
                        return table.insert(objs);
                    })
                },
                withKnex: function () {
                    return knex(nameSchema + '.' + tableName);   //recurre a knex para consultas complejas, no se encuentra en dinamicTable
                }
            };
        }
    };
};