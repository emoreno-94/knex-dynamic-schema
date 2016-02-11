'use strict';

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

var dinamicPg = require('./dinamicPg')(knex, 'pruebas');

//testeo de metodos
//creacion de tablas
dinamicPg.createTable({
    'tableName': 'tabla_1',
    'attributes': {
        'numero': {
            type: 'integer'
        },
        'string': {
            'type': 'string',
            'length': 50
        },
        'texto': {
            'type': 'text'
        },
        'yeometria': {
            'type': 'geometry',
            'subtype': 'POINT'
        }
    }
}).then(function () {
   return dinamicPg.createTable({
       'tableName': 'tabla_2',
       'attributes': {
           'texto_2': {
               'type': 'text'
           },
           'yeometria_2': {
               'type': 'geometry',
               'subtype': 'POINT'
           }
       }
   })
}).then(function () {
    //remonbre de tablas
    return dinamicPg.renameTable('tabla_2', 'tabla_renombrada')
}).then(function () {
    //insercion de cosas
    return dinamicPg.table('tabla_renombrada').insert({
        texto_2: 'soy texto loco'
    }).then(function () {
        return dinamicPg.table('tabla_1').insert({
            numero: 8,
            string: 'stringcito',
            'texto': 'textootxet',
            yeometria: 'SRID=4326;POINT(-70 -30)'
        })
    })
}).then(function () {
    //return dinamicPg.table('tabla_1').where('numero', 8).del()
}).then(function() {
    //return dinamicPg.dropTable('tabla_renombrada');
}).then(function () {
    return dinamicPg.table('tabla_1').renameColumn('numero', 'numero_renombrado');
}).then(function () {
    return dinamicPg.table('tabla_1').addColumn({
        columnName: 'newCol',
        properties: {
            type: 'integer',
            default: 5
        }
    });
});