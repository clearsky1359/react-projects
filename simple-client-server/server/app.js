//import modules 
const express=require('express')
const mongoose=require('mongoose')


const cors=require('cors')
require('dotenv').config()

//app
const app=express();

//DB
mongoose.connect('mongodb+srv://nikan:Nikan2017@cluster0.i9tio.mongodb.net/?retryWrites=true&w=majority').then(()=>{console.log('connected to Database')})


//middleware

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://3000-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io");
  console.log('Cors test')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 

//Model

const testSchema = new mongoose.Schema({
  test: {
    type: String,
    required: true
  }
})

const TestModel = mongoose.model('Test', testSchema);



//routes 
app.get('/test', async (req,res)=>{
  

  const tests=await TestModel.find()

  res.status(200).json(tests)


})


app.post('/test', async (req, res) => {
  try {
    const { test } = req.body;

    // Create a new task object
    const task = new TestModel({
      test
    });

    // Save the task to the database
    await task.save();

    // Send a response indicating success
    res.status(201).json({ message: 'Task created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});




//server
const PORT=process.env.PORT || 8081
const server=app.listen(PORT,()=>console.log('connected........'))