// import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routerTest = require('./routes/test2');
const multer = require('multer');
require('dotenv').config();

// app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.URI).then(() => console.log('Connected to DB'));

// Create a schema for the image
const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String
});

// Create a model for the image
const Image = mongoose.model('Image', imageSchema);

// Create a Multer storage engine that stores files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    console.log('done');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Define a route to get all images
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find({});
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// router
app.use('/', routerTest);

// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => console.log(`Server is running and listening to port ${PORT}`));