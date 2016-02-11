/*
 --> objeto qu se manda para crear una tabla
 {
     tableName: 'user',
     attributes: {
        nameAtt: {...(ver abajo)}
     }
 }
 */
/*
 Lo que puede recibir por el momento
 -> todos poseen posibilidad de poner:
 ----> default, primary, unique, notNullable, nullable

 ----> simples sin opciones extras
 type: 'integer', 'boolean', 'text', 'bigInteger', 'date', 'dateTime', 'time', 'timestamps'

 ----> con opciones
 {
     type: 'incremental',
     ammount: int -> por defecto 1
 },
 {
     type: 'string',
     length: int -> por defecto 255
 },
 {
     type: 'float', 'decimal',
     precision: int, -> default 8
     scale: int -> default 2
 },
 {
     type: 'timestamp',
     standard : mmmmm...no se
 },
 {
     type: 'geom',
     srid: int --> default -Z 4326
    'subtype': string -> POINT...
 }

 geometry(point, 4326)
 */
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
    else if (data.type === 'geom') {
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