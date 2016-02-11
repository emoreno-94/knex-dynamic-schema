--> objeto qu se manda para crear una tabla
 {
     tableName: 'user',
     attributes: {
        nameAtt: {...(ver abajo)}
     }
 }

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
