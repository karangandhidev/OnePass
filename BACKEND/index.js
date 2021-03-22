const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const jwt  = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const user = require('./users')
const address = require('./address')
const cards = require('./cards')
const bank = require('./banks')
const notes = require('./notes')
const passwords = require('./passwords')
const secret ="afhakjfgakfg&*%^$%^afasdk"
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/onepass',{
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(()=>console.log("done"))

var corsoption = {
    origin : "http://localhost:19006"
}
app.use(express.static(path.join(__dirname,'static')))
app.listen(port,()=>console.log("Listening"))
app.use(bodyParser.json())
app.use(cors(corsoption))
app.post('/register',async (req,res)=>{
   
    user.find({}).then((db)=>{
        if(db.length > 0){
            mongoose.connection.db.dropDatabase().then(async ()=>{
                let {username,password,hint} = req.body
 
    console.log(hint)
    password = bcrypt.hashSync(password,10)
    try{
      let response =   await user.create({
            username,password,hint
        })
        res.json({status:"okay"})   
    }catch(error){
        console.log(error)
        return res.json({
            status : "error"
        })
    }
            })
        }
    }).catch(err=> console.log(err))
    let {username,password,hint} = req.body
 
    console.log(hint)
    password = bcrypt.hashSync(password,10)
    try{
         let response = await user.create({
            username,password,hint
        })
        res.json({status:"okay"})   
    }catch(error){
        console.log(error)
        return res.json({
            status : "error"
        })
    }
    
})

app.post('/login', async (req,res)=>{
const {username,password} = req.body
const User = await user.findOne({username}).lean()
if(!User){
    return res.status(403).send({status:'error',error:'Invalid username or password'})
}
if(await bcrypt.compare(password, User.password)){
    const token = jwt.sign({
        id:User._id,
        username:User.username,
        hint:User.hint
    },secret)
    res.status(200).send({
         data:token
    })
}
else{
    res.status(403)
     res.json({error:'Invalid username or password'})
}
})

app.post('/address',async (req,res)=>{
    const {name,apartment,street,landmark,city,state,country,pincode} = req.body

    
    try{
        const response = await address.create({
           name,apartment,street,landmark,city,state,country,pincode
        })
        res.json({status:"okay"})   
    }catch(error){
        console.log(error)
        return res.json({
            status : "error"
        })
    }

})

app.post('/cards',async(req,res)=>{
    const {name,number,cvv,moe,bankname,password,notes} = req.body
    try{
        const response = await cards.create({name, number, cvv, moe, bankname, password, notes})
        res.json({status:"okay"})   
    }catch(error){
        console.log(error)
        return res.json({
            status : "error"
        })
    }
})

app.post('/bank',async (req,res)=>{
    const {bank_name,acc_no,ifsc,branch,telephone,note} = req.body
    try{
        const response = await bank.create({bank_name,acc_no,ifsc,branch,telephone,note})
        res.json({status:"okay"})   
    }catch(error){
        console.log(error)
        return res.json({
            status : "error"
        })
    }
})

app.post('/notes',async(req,res)=>{
    const{name,topic,note}= req.body
    try{
        const response = await notes.create({name,topic,note})
        res.json({status:"okay"})   
    }catch(error){
        console.log(error)
        return res.json({
            status : "error"
        })
    }
})

app.post('/passwords',async(req,res)=>{
    const {name,category,url,username,email,password,note} = req.body
    try{
        const response = await passwords.create({name,category,url,username,email,password,note})
        res.json({status:"okay"})   
    }catch(error){
        console.log(error)
        return res.json({
            status : "error"
        })
    }
})

app.get('/creds',async (req,res)=>{
    const User = await user.findOne({})
    res.status(200).json({username:User.username,hint:User.hint})
})