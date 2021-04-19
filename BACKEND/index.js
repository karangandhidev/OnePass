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
            mongoose.connection.db.dropDatabase().then
            (async ()=>
                {
                    let {username,password,hint} = req.body
                    password = bcrypt.hashSync(password,10)
                    try{
                            let response =   await user.create
                            ({
                                username,password,hint
                            })
                            // return res.status(200).json({status:"okay"})   
                        }
                catch(error){
                    console.log(error)
                    return res.json({status : "error"})
                        }
                }
            ).catch(er=>console.log(er))
}
}).catch(err=> console.log(err))
    let {username,password,hint} = req.body
 
    // console.log(hint)
    password = bcrypt.hashSync(password,10)
    try{
         let response = await user.create({
            username,password,hint
        })
        res.status(200).send({status:"okay"})   
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
    const token = jwt.sign(User,secret)
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
    const{topic,note}= req.body
    try{
        const response = await notes.create({topic,note})
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

app.get('/alldata',async (req,res)=>{
    const token = req.header("Auth")
    if(token){
        const verification = jwt.verify(token,secret)
        if(verification){
            const Address = await address.find({})
            const Bank = await bank.find({})
            const Cards = await cards.find({})
            const Passwords = await passwords.find({})
            const Notes = await notes.find({})
            const data  = [Address,Bank,Cards,Passwords,Notes]
            res.status(200).json(data)
        }else{
            res.status(200).json({message:"User Unauthorized"})
        }
    }else{
        res.status(200).json({message:"User Unauthorized"})
    }
})

app.get('/address',async(req,res)=>{
    
    const token = req.header("Auth")
    if(token){
        const verification = jwt.verify(token,secret)
        if(verification){
            const Address = await address.find({})
            res.status(200).json(Address)
        }else{
            res.status(200).json({message:"User Unauthorized"})
        }
    }else{
        res.status(200).json({message:"User Unauthorized"})
    }
})



app.get('/cards',async(req,res)=>{
    
    const token = req.header("Auth")
    if(token){
        const verification = jwt.verify(token,secret)
        if(verification){
            const Cards = await cards.find({})
            res.status(200).json(Cards)
        }else{
            res.status(200).json({message:"User Unauthorized"})
        }
    }else{
        res.status(200).json({message:"User Unauthorized"})
    }
})

app.get('/bank',async(req,res)=>{
    
    const token = req.header("Auth")
    if(token){
        const verification = jwt.verify(token,secret)
        if(verification){
            const Bank = await bank.find({})
            res.status(200).json(Bank)
        }else{
            res.status(200).json({message:"User Unauthorized"})
        }
    }else{
        res.status(200).json({message:"User Unauthorized"})
    }
})

app.get('/notes',async(req,res)=>{
    
    const token = req.header("Auth")
    if(token){
        const verification = jwt.verify(token,secret)
        if(verification){
            const Notes = await notes.find({})
            res.status(200).json(Notes)
        }else{
            res.status(200).json({message:"User Unauthorized"})
        }
    }else{
        res.status(200).json({message:"User Unauthorized"})
    }
})

app.get('/socials',async(req,res)=>{ 
    const token = req.header("Auth")
    if(token){
        const verification =jwt.verify(token,secret)
        if(verification){
            const Socials = await passwords.find({})
            res.status(200).json(Socials)
        }else{
            res.status(200).json({message:"wrong jwt"})
        }
    }else{
        res.status(200).json({message:"no jwt"})
    }
})

app.put('/bank/:id',(req,res)=>{
    const {bank_name,acc_no,ifsc,branch,telephone,note} = req.body
    bank.findByIdAndUpdate({_id:req.params.id},{$set:{bank_name:bank_name,acc_no:acc_no,ifsc:ifsc,branch:branch,telephone:telephone,note:note}},{new:true,useFindAndModify:false},(err,data)=>{
        res.send("updated")
        res.end()
    })
})

app.put('/address/:id',(req,res)=>{
    const {name,apartment,street,landmark,city,state,country,pincode} = req.body
    address.findByIdAndUpdate({_id:req.params.id},{$set:{name:name,apartment:apartment,street:street,landmark:landmark,city:city,state:state,country:country,pincode:pincode}},{new:true,useFindAndModify:false},(err,data)=>{
        res.send("updated")
        res.end()
    })
})


app.put('/cards/:id',(req,res)=>{
    const {name,number,cvv,moe,bankname,password,notes} = req.body
    cards.findByIdAndUpdate({_id:req.params.id},{$set:{name:name,number:number,cvv:cvv,moe:moe,bankname:bankname,password:password,notes:notes}},{new:true,useFindAndModify:false},(err,data)=>{
        res.send("updated")
         res.end()
    })
})


app.put('/passswords/:id',(req,res)=>{
    const {name,category,url,username,email,password,note} = req.body
    passwords.findByIdAndUpdate({_id:req.params.id},{$set:{name:name,category:category,url:url,username:username,email:email,password:password,note:note}},{new:true,useFindAndModify:false},(err,data)=>{
        res.send("updated")
         res.end()
    })
})

app.put('/notes/:id',(req,res)=>{
    const {name,topic} = req.body
    notes.findByIdAndUpdate({_id:req.params.id},{$set:{name:name,topic:topic}},{new:true,useFindAndModify:false},(err,data)=>{
        res.send("updated")
         res.end()
    })
})


app.delete('/bank/:_id',(req,res)=>{
    bank.findByIdAndDelete({_id:req.params._id},(err,r)=>{
        if(err){
            res.send(err)
            res.end()
        }
        else{
            res.send("done")
        res.end()
        }
        
    })
        
})

app.delete('/cards/:_id',(req,res)=>{
    cards.findByIdAndDelete({_id:req.params._id},(err,r)=>{
        if(err){
            res.send(err)
            res.end()
        }
        else{
            res.send("done")
        res.end()
        }
        
    })
        
})

app.delete('/passwords/:_id',(req,res)=>{
    passwords.findByIdAndDelete({_id:req.params._id},(err,r)=>{
        if(err){
            res.send(err)
            res.end()
        }
        else{
            res.send("done")
        res.end()
        }
        
    })
        
})

app.delete('/notes/:_id',(req,res)=>{
    notes.findByIdAndDelete({_id:req.params._id},(err,r)=>{
        if(err){
            res.send(err)
            res.end()
        }
        else{
            res.send("done")
        res.end()
        }
        
    })
        
})

app.delete('/address/:_id',(req,res)=>{
    address.findByIdAndDelete({_id:req.params._id},(err,r)=>{
        if(err){
            res.send(err)
            res.end()
        }
        else{
            res.send("done")
        res.end()
        }
        
    })
        
})