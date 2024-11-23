const express= require('express')
const app= express()
const sequelize= require('./database')

sequelize.sync().then(()=>{
    console.log("Base de donnee synchronise")
})

app.listen(3000,()=>{
    console.log("Bonjour les amis sur le port 3000")
})