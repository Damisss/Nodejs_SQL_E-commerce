const Sequelize = require('sequelize')
const sequelize = require('../../util/database')

const Product = sequelize.define('product',{
    id:{
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,

    },
     name:{
        type: Sequelize.STRING,
        allowNull: false,  
     },
     description:{
       type: Sequelize.STRING,
       allowNull: false
     },
     price:{
         type: Sequelize.DOUBLE,
         allowNull: false
     }
});

module.exports = Product