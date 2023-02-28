//import modules 
const express= require('express')
require('dotenv').config()

//app
const app=express();

//routes 
app.get('/test', (req,res)=>{res.status(200).json({message:'hooora'})})

//server
const PORT=process.env.PORT || 8080
const server=app.listen(PORT,()=>console.log('connected........'))