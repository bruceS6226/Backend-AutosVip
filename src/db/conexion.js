const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    database: 'autosvip',
    username: 'root',
    password: 'conmigo6226DCM',
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;