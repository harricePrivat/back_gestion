const express= require('express')
const router = express.Router()
const User= require('../models/User')

router.get('/andrana',(req,res)=>{
    const data= req.query
    console.log("Voici la donnee",data)
    res.send("Test Be ity")
})

module.exports = router ;