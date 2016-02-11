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

dinamicPg.createTable({
    tableName: 'test',
    attributes: {
        numeritos: {
            type: 'integer'
        },
        geometriaxD: {
            type: 'geom',
            srid: 4326,
            subtype: 'POINT'
        },
        str: {
            type: 'string'
        },
        te: {
            type: 'text'
        }
    }
}).then(function() {
    return dinamicPg.table('test').addColumn('lalala', {type: 'integer', default: 7});
});

//return dinamicPg.table('test').addColumn('lalaqweqwela', {type: 'integer', default: 20});
/*
dinamicPg.table('test').insert({
    numeritos: 5,
    str: 'soy un string'
});*/
/*
dinamicPg.table('test').withKnex().where('str', 'soy un string').del()
    .then(function(la) {
        console.log('no error')
    })
    .catch(function(err){
        console.log('error')
    });
dinamicPg.table('test').withKnex().dropColumn('numeritos');*/