const {Sequelize}= require('sequelize')

const db = new Sequelize("gestion","brice","brice",{
    host: 'localhost',
    dialect: 'mysql'

})


module.exports=db