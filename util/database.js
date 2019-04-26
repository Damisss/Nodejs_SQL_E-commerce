const Sequelize = require('sequelize')

const sequelize = new Sequelize('e-commerce', 'root', 'Password', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize