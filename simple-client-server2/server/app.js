// Import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routerTest = require('./routes/test2');
const multer = require('multer');
require('dotenv').config();

// Create a Multer storage engine that stores files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a schema for the image
const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String
});

// Create a model for the image
const Image = mongoose.model('Image', imageSchema);

// Connect to the database
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to DB'))
  .catch(error => console.error('Error connecting to database:', error));

// Create an instance of the express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line
app.use(cors());

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
    if (!images) {
      res.status(404).send('No images found');
    } else {
      const data = images.map(image => ({
        name: image.name,
        contentType: image.contentType,
        data: image.data ? image.data.toString('base64') : null // Convert buffer to base64 string
      }));
      res.json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Use the test router
app.use('/', routerTest);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running and listening to port ${PORT}`));
