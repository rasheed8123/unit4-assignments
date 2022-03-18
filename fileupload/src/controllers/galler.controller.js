const express = require("express")
const app = express();
const gallery = require("../models/gallery.model")
const uploads = require("../middleware/gallery")
app.get("",async(req,res)=>{
    try{
     const data = await gallery.find({}).lean().exec()
     res.send(data)
    }catch(err){
        console.log(err.message)
        return res.status(400).send(err.message)
    }
})
app.post("",uploads.any("profilepic",5),async(req,res)=>{
    try{
        if(findById({__id:req.body.userid})){
            const data = await gallery.findByIdAndUpdate({__id:req.body.userid},{set:{profilepic:req.file.path}})
    }
    else{
        const data = await gallery.create({profilepic:req.file.path})
    
    }
    res.send(data)    
}catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
module.exports = app;