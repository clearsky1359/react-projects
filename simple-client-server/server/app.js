//import modules 
const express= require('express')
const cors=require('cors')
require('dotenv').config()

//app
const app=express();

//middleware

const corsOptions = {
    origin: 'https://3000-clearsky135-reactprojec-pn9cq9isfm9.ws-us88.gitpod.io/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.get('/test', cors(corsOptions), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for only example.com.'})
  })


//routes 
app.get('/test', (req,res)=>{res.status(200).json({message:'hooora'})})

//server
const PORT=process.env.PORT || 8080
const server=app.listen(PORT,()=>console.log('connected........'))