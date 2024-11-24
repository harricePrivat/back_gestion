const express= require('express')
const app= express()
const sequelize= require('./database')
const User= require('./models/User')
const router= require('./routes/User')
const path= require('path')

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json())
app.use(router)

sequelize.sync().then(()=>{
    console.log("Base de donnee synchronise")
}).catch(err=> console.log("Voici l'erreur: ",err))

app.listen(3000,()=>{
    console.log("Bonjour les amis sur le port 3000")
})