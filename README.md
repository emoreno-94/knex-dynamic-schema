#knex-dynamic-schema#
Este modulo facilita la construccion dinamica de tablas en una base de datos. Posee funcionalidades como la
creación y eliminación de tablas/columnas.
  
#Instalación
```bash
npm install knex-dynamic-schema
```

#Instrucciones de uso#

Para poder usar el módulo, primero se debe establecer una conexion con ayuda de knex
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

Posterior a lo cual ya se está en condiciones de usar *dynamicSchema*:

### Inicialización ###
```javascript
var dynamicPg = require('knex-dynamic-schema')(knex, schemaName);   //schemaNema -> nombre del esquema a usar
```
Objeto mal construido!!!
### Métodos ###
*Importante: Todos los métodos se concatenan en base a promesas*
#### Métodos para el esquema ####
```javascript
//Crea la tabla correspondiente en la base de datos
dynamicSchema.createTable({
    tableName: [string],
    attributes: [
        {
            columnName: [string],
            type: [string], // algun tipo permitido
            [string]: [string], ...  //distintos tipos tienes distintas propiedades como: primary: true
        },{
            ...
        }
    ]
});

//Elimina la tabla respectiva
dynamicSchema.dropTable(tableName);

//Renombrar una tabla
dynamicSchema.renameTable(oldName, newName);
```

Propiedades permitidas por todos los tipos: `default`, `primary`, `unique`, `notNullable`, `nullable`, `unsigned`.
***Todas son tipo `bObjeto mal construido!!!oolean` salvo `default`

Tipos soportados por el momento:
```javascript
//simples sin propiedades extras (salvo las mencianadas anteriormente)
--> type: 'integer', 'boolean', 'text', 'bigInteger', 'date', 'dateTime', 'time', 'timestamps'

//con opciones especiales
{
    type: 'incremental',
    ammount: [int] //por defecto 1
},
{
    type: 'string',
    length: [int] //por defecto 255
},
{
    type: 'float', 'decimal',
    precision: [int], //por defecto 8
    scale: [int]  //por defecto 2
},
{
    type: 'timestamp',
    standard : mmmmm...no se
},
{
    type: 'geom',   //sólo disponible en base de datos postgres con extensión postgis
    srid: [int]   //por defecto 4326
    subtype: [string]
}
```

#### Métodos por tabla ####
```javascript
//agrega una columna a la tabla especificada
dynamicSchema.table(tableName).addColumn({
    columnName: [string],
    type: [string], // algun tipo permitido
    [string]: [string], ...  //distintos tipos tienes distintas propiedades como: primary: true
});

//elimina una columna de la tabla
dynamicSchema.table(tableName).dropColumn(columnName);

//renombra una columna
dynamicSchema.table(tableName).renameColumn(oldName, newName);

//realizar operaciones sobre la tabla tipo knex
dynamicSchema.table(tableName).[cosas de knex como where, del, ...]
```