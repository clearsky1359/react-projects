const express = require("express");
const router = express.Router();
const {getFromTest}=require('../controllers/test2')
const {PutToTest}=require('../controllers/test2')


router.get('/getAlltests', getFromTest)
router.post('/getAlltests', PutToTest)

module.exports = router;