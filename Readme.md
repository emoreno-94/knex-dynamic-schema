Para poder usar el modulo, primero se debe establecer una conexion con ayuda de knex
```javascript
var knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'csw',
        password: 'pass',
        database: 'rutas'
    }
});
```

Posterior a lo cual ya se está en condiciones de usar *dynamicPg*:

### Inicialización ###
```javascript
var dynamicPg = require('./dynamicPg')(knex, schemaName);   //schemaNema -> nombre del esquema a usar
```

### Métodos ###
*Importante: Todos los métodos se concatenan en base a promesas*
## Métodos para el esquema ##
```javascript
//Crea la tabla correspondiente en la base de datos
dynamicPg.createTable({
    tableName: 'table',
    attributes: {
        attr_1: {
            type: [algun tipo permitido],
            [props]: [value_prop], ...  //distintos tipos tienes distintas propiedades
        }
});

//Elimina la tabla respectiva
dynamic.dropTable(tableName);

//Renombrar una tabla
dynamic.renameTable(oldName. newName);
```

Propiedades permitidas por todos los tipos: default, primary, unique, notNullable, nullable, unsigned.
***Todas son tipo boolean salvo *default*

Tipos soportados por el momento:
```javascript
//simples sin propiedades extras (salvo las mencianadas anteriormente)
--> 'integer', 'boolean', 'text', 'bigInteger', 'date', 'dateTime', 'time', 'timestamps'

//con opciones especiales
{
    type: 'incremental',
    ammount: int //por defecto 1
},
{
    type: 'string',
    length: int //por defecto 255
},
{
    type: 'float', 'decimal',
    precision: int, //por defecto 8
    scale: int  //por defecto 2
},
{
    type: 'timestamp',
    standard : mmmmm...no se
},
{
    type: 'geom',
    srid: int   //por defecto 4326
    subtype: string
}
```

## Métodos por tabla ##
```javascript
//agrega una columna a la tabla especificada
dynamicPg.table(tableName).addColumn({
    columnName: [string],
    properties: {
        type: ...//las mismas que antes
    }
});

//elimina una columna de la tabla
dynamic.table(tableName).dropColumn(columnName);

//renombra una columna
dynamic.table(tableName).renameColumn(oldName, newName);

//realizar operaciones pobre la tabla tipo knex
dynamicPg.table(tableName).[cosas de knex como where, del, ...]
```