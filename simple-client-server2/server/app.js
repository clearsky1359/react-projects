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
app.use(cors({origin:'https://3000-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io'}))


mongoose.connect(process.env.URI).then(()=>console.log('Connected to DB'))

//router
app.use('/', routerTest)

//port
const PORT=process.env.PORT||8080

//server
app.listen(PORT, ()=>console.log(`Server is running and listening to port ${PORT}`))