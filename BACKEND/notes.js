const mongoose = require('mongoose')

notesSchema = mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    }
},{
    collection:'notes'
})

const model = mongoose.model('Note Schema', notesSchema)
module.exports = model