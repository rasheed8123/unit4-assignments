const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json());
const connect = () =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/relation")
}

const userSchema = new mongoose.Schema({
    firstname : {type: String,required:true},
    lastname: {type:String,required:true}
})

const user = mongoose.model("user",userSchema)

const sectionSchema = new mongoose.Schema({
    name: {type:String,required:true}
}) 

const sections = mongoose.model("section",sectionSchema)

const bookSchema = new mongoose.Schema({
    sectionid: {type: mongoose.Schema.Types.ObjectId,ref:"section",required:true},
    name: {type:String,required:true},
    body: {type:String,required:true}
})
const books = mongoose.model("book",bookSchema)

const authorSchema = new mongoose.Schema({
    userid : {type:String,required:true}
})
const author = mongoose.model("author",authorSchema)

const book_authorSchema = new mongoose.Schema({
    bookid : {type:mongoose.Schema.Types.ObjectId,ref:"book",required:true},
    authorid: {type:String,required:true}
})
const book_authors = mongoose.model("book_author",book_authorSchema)

const checked_outSchema = new mongoose.Schema({
    userid:{type:String,required:true},
    bookid:{type:String,required:true},
    checkedout:{type:String,required:true},
    checkedin:{type:String,required:true},

})
app.get("/books",async(req,res)=>{
    try{
        const data = await books.find().populate({path:"sectionid",select:["name"]}).lean().exec()
        return res.status(200).send(data)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    } 
}) 
app.get("/book_authors/:id",async(req,res)=>{
    try{
        const data = await book_authors.find({"authorid":req.params.id}).lean().exec()
        return res.status(200).send(data)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
app.get("/books/:id",async(req,res)=>{
    try{
        const data = await books.find({"sectionid":req.params.id}).lean().exec()
        return res.status(200).send(data)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
app.post("/book_authors",async(req,res)=>{
    try{
        const data = await book_authors.create(req.body)
        return res.status(200).send(data)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
app.get("/book_authors",async(req,res)=>{
    try{
        const data = await book_authors.find().populate({path:"bookid",select:["sectionid","name","body"]}).lean().exec()
        return res.status(200).send(data)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
app.get("/author/:id",async(req,res)=>{
    try{
        const data = await author.findById(req.params.id).lean().exec()
        return res.status(200).send(data)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
app.get("/authors",async(req,res)=>{
    try{
        const data = await author.find({}).lean().exec()
        return res.status(200).send(data)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
app.post("/authors",async(req,res)=>{
    try{
        const data = await author.create(req.body)
        return res.status(200).send(data)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
app.post("/books",async(req,res)=>{
    try{
        const data = await books.create(req.body)
        return res.status(200).send(data)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
app.get("/sections",async(req,res)=>{
    try{
        const section = await sections.find({}).lean().exec()
        return res.status(200).send(section)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
app.post("/sections",async(req,res)=>{
    try{
        const section = await section.create(req.body)
        return res.status(200).send(section)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
app.get("/users",async(req,res)=>{
    try{
        const section = await user.find({}).lean().exec()
        return res.status(200).send(section)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})
app.post("/users",async(req,res)=>{
    try{
        const section = await user.create(req.body)
        return res.status(200).send(section)
    }
    catch(err){
        console.log(err.message)
        return res.send(err.message)
    }
})





app.listen(5000,async()=>{
    try{
        await connect();
    }catch(err){
        console.log(err.message)
    }
    console.log("listening")
})