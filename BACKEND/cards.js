const mongoose = require('mongoose')

const cardsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    cvv:{
        type:Number,
        required:true
    },
    moe:{
        type:String,
        required:true
    },
    bankname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    notes:{
        type:String,
        required:true
    }
},{
    collection:'cards'
})

const model = mongoose.model('cards schema',cardsSchema)
module.exports = model