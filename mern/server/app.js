//import modules
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const morgan=require('morgan')
require('dotenv').config()

//app
const app=express()


//db

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log('DB connected**********')).catch((err)=>console.log('DB connection error',err))

//middleware
app.use(morgan('dev'))
app.use(cors({origin:true, credential:true}))

//routes


//port
const port=process.env.PORT||8080

//listener
const server=app.listen(port, ()=>console.log(`Server is running on port ${port}....`))