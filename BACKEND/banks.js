const mongoose = require('mongoose')

const BankSchema = mongoose.Schema({
    bank_name:{
        type:String,
        required:true
    },
    acc_no:{
        type:String,
        required:true
    },
    ifsc:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    telephone:{
        type:Number,
        required:true
    },
    note:{
        type:String,
        required:true
    }
},{
    collection:'banks'
})

const model = mongoose.model('Bank Schema',BankSchema)
module.exports = model