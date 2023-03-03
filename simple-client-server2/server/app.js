//import modules
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const routerTest=require('./routes/test2')
require('dotenv').config();

//app
const app=express()

//middleware
app.use(express.json())

//db
mongoose.connect(process.env.URI).then(()=>console.log('Connected to DB'))

//router
app.use('/', routerTest)

//port
const PORT=process.env.PORT||8080

//server
app.listen(PORT, ()=>console.log(`Server is running and listening to port ${PORT}`))