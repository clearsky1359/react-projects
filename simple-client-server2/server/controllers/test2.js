const Test2=require('../models/test2')


exports.getFromTest = async (req, res) => {
	
    const allTests= await Test2.find()

	res.status(200).json(allTests);
};

exports.PutToTest = async (req, res) => {   
    const newTest=new Test2(req.body)
    await newTest.save()
	res.status(200).json(newTest);
};
