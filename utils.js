'use strict';

function createColumn(table, attrName, data) {
    var column;
    if (data.type === 'integer' || data.type === 'boolean' || data.type === 'bigInteger' || data.type === 'text'
        || data.type === 'date' || data.type === 'dateTime' || data.type === 'time' || data.type === 'timestamps')
        column = table[data.type](attrName);
    else if (data.type === 'increments')
        column = table.increment(attrName, data.ammount ? data.ammount : 1);
    else if (data.type === 'string')
        column = table.string(attrName, data.length ? data.length : 255);
    else if (data.type === 'float' || data.type === 'decimal')
        column = table[data.type](attrName, data.precision ? data.precision: 8, data.scale ? data.scale: 2);
    else if (data.type === 'timestamp')
        column = table.timestamp(attrName).defaultTo(knex.fn.now());
    else if (data.type === 'geometry') {
        column = table.specificType(attrName, 'GEOMETRY(' + data.subtype + ', ' + (data.srid ? data.srid : 4326) + ')');
    }

    if (data.default) column.defaultTo(data.default);
    if (data.primary) column.primary();
    if (data.unique) column.unique();
    if (data.notNullable) column.notNullable();
    if (data.nullable) column.nullable();
    if (data.unsigned) column.unsigned();
}

module.exports = {
    'createColumn': createColumn
};