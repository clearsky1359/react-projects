//import modules
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const routerTest=require('./routes/test2')
const multer  = require('multer');
require('dotenv').config();

//app
const app=express()

//middleware
app.use(express.json())
//app.use(cors({origin:'https://3000-clearsky135-reactprojec-pn9cq9isfm9.ws-us89.gitpod.io'}))
// Configure CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

mongoose.connect(process.env.URI).then(()=>console.log('Connected to DB'))

//////////////////////////////////////////////////
// Create a schema for the image
const imageSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
  });
  
// Create a model for the image
const Image = mongoose.model('Image', imageSchema);

// Create a Multer storage engine that stores files in memory
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Define a route to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const image = new Image({
        name: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype
      });
      await image.save();
      res.send('File uploaded successfully');
      console.log('done')
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

////////////////////////////////////////////////////

//router
app.use('/', routerTest)

//port
const PORT=process.env.PORT||8080

//server
app.listen(PORT, ()=>console.log(`Server is running and listening to port ${PORT}`))