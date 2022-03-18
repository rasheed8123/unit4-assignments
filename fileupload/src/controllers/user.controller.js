const express = require("express")
const app = express();
const fs = require('fs')
const uploads = require("../middleware/uploads")
const users = require("../models/user.model")
app.get("",async(req,res)=>{
    try{
    const data = await users.find({}).lean().exec()
       return res.status(200).send(data)
    }catch(err){
        console.log(err.message)
        return res.status(400).send(err.message)
    }
})
app.patch("/:id",async(req,res)=>{
    try{
    const data = await users.findById({__id:req.params.id}).lean().exec()
    if(data){
        unlink(data.profilepic, (err) => {
            if (err) throw err;
            users.findByIdAndUpdate({__id:req.params.id},{profilepic:req.file.path}).lean().exec()
          });
    } else{
         return res.send("invalid user id")
    } 
    
    
    return res.status(200).send(data)
    }catch(err){
        console.log(err.message)
        return res.status(400).send(err.message)
    }
})
app.delete("/:id",async(req,res)=>{
    try{
    const data = await users.findById({_id:req.params.id}).lean().exec()
    if(data){
        fs.unlink(data.profilepic, (err) => {
            users.findByIdAndDelete({_id:req.params.id}).lean().exec()
          });
    } else{
         return res.send("invalid user id")
    } 
    
    
    return res.status(200).send(data)
    }catch(err){
        console.log(err.message)
        return res.status(400).send(err.message)
    }
})
app.post("",uploads.single("profilePic"),async(req,res)=>{
    try{
     console.log(req.file.path)
    const data = await users.create({profilepic:req.file.path})
    console.log(data)   
    return res.send(data)
    }catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
module.exports = app;