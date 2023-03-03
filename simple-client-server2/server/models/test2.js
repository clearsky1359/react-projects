const mongoose=require('mongoose');

const test2Schema=new mongoose.Schema({

    name:{type:String,
        required: true
    },
    email:{type:String,
        required: true
    }
})

module.exports = mongoose.model("Test2", test2Schema);
