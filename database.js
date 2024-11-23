const {Sequelize}= require('sequelize')

const sequelize = new Sequelize("gestion","brice","brice",{
    host: 'localhost',
    dialect: 'mysql'

})

    
module.exports = sequelize;