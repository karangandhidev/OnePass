const mongoose = require('mongoose')

const SocialSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
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
    collection:'socials'
})

const model = mongoose.model('Social Schema',SocialSchema)
module.exports = model