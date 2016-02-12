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

var dynamicSchema = require('./lib/index')(knex, 'pruebas');

//testeo de metodos
//creacion de tablas

dynamicSchema.createTable({
    'tableName': 'tabla_1',
    'attributes': [
        {
            columnName: 'numero',
            type: 'integer'
        },
        {
            columnName: 'string',
            type: 'string',
            length: 50
        },
        {
            columnName: 'texto',
            type: 'text'
        },
        {
            columnName: 'yeometria',
            type: 'geometry',
            subtype: 'POINT'
        }
    ]
}).then(function () {
    return dynamicSchema.createTable({
        tableName: 'tabla_2',
        attributes: [
            {
                columnName: 'texto_2',
                type: 'text'
            },
            {
                columnName: 'yeometria_2',
                type: 'geometry',
                subtype: 'POINT'
            }
        ]
    })
}).then(function () {
    //remonbre de tablas
    return dynamicSchema.renameTable('tabla_2', 'tabla_renombrada')
}).then(function () {
    //insercion de cosas
    return dynamicSchema.table('tabla_renombrada').insert({
        texto_2: 'soy texto loco'
    }).then(function () {
        return dynamicSchema.table('tabla_1').insert({
            numero: 8,
            string: 'stringcito',
            'texto': 'textootxet',
            yeometria: 'SRID=4326;POINT(-70 -30)'
        })
    })
}).then(function () {
    //return dynamicSchema.table('tabla_1').where('numero', 8).del()
}).then(function() {
    //return dynamicSchema.dropTable('tabla_renombrada');
}).then(function () {
    return dynamicSchema.table('tabla_1').renameColumn('numero', 'numero_renombrado');
}).then(function () {
    return dynamicSchema.table('tabla_1').addColumn({
        columnName: 'newCol',
        type: 'integer',
        default: 5
    });
});