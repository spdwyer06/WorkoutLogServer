const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, 'postgres', process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

db.authenticate()
    .then(() => console.log('Db connection successfully established'))
    .catch(err => console.log('There was an error establishing a db connection', err));

module.exports = db;