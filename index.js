const express= require('express')
const app= express()
const sequelize= require('./database')
const User= require('./models/User')

app.use(express.json())

sequelize.sync().then(()=>{
    console.log("Base de donnee synchronise")
}).catch(err=> console.log("Voici l'erreur: ",err))

app.listen(3000,()=>{
    console.log("Bonjour les amis sur le port 3000")
})