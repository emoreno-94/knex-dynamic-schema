module.exports = function(knex, nameSchema) {
    return require('./functions')(knex, nameSchema);
};