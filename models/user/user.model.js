const Sequelize = require('sequelize')
const sequelize = require('../../util/database')

const User = sequelize.define('user', {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        } 
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    }
})
module.exports = User