'use strict';

function createColumn(table, attributes) {
    var column;
    if (attributes.type === 'integer' || attributes.type === 'boolean' || attributes.type === 'bigInteger' || attributes.type === 'text'
        || attributes.type === 'date' || attributes.type === 'dateTime' || attributes.type === 'time' || attributes.type === 'timestamp')
        column = table[attributes.type](attributes.columnName);
    else if (attributes.type === 'increments')
        column = table.increment(attributes.columnName, attributes.ammount ? attributes.ammount : 1);
    else if (attributes.type === 'string')
        column = table.string(attributes.columnName, attributes.length ? attributes.length : 255);
    else if (attributes.type === 'float' || attributes.type === 'decimal')
        column = table[attributes.type](attributes.columnName, attributes.precision ? attributes.precision: 8, attributes.scale ? attributes.scale: 2);
    else if (attributes.type === 'geometry') {
        column = table.specificType(attributes.columnName, 'GEOMETRY(' + attributes.subtype + ', ' + (attributes.srid ? attributes.srid : 4326) + ')');
    }

    if (attributes.default) column.defaultTo(attributes.default);
    if (attributes.primary) column.primary();
    if (attributes.unique) column.unique();
    if (attributes.notNullable) column.notNullable();
    if (attributes.nullable) column.nullable();
    if (attributes.unsigned) column.unsigned();
}

module.exports = {
    'createColumn': createColumn
};