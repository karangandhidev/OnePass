const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        },
    apartment:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    }

},{
    collection:'addresses'
})

const model = mongoose.model("Address Schema",addressSchema)
module.exports = model