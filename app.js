
const mongoose=require('mongoose');
const express=require('express');
const Posts = require('models/post');
 let user_function=require("models/user");
 let rout=require("Routes/user");
 const interaction=require("Routes/interection");
 const user_interaction=require("Routes/interection")
const comm=require("Routes/community");
const Process = require("process");
const Grid = require("gridfs-stream");
const {GridFsStorage} = require("multer-gridfs-storage");
const multer = require("multer");

var app=express();
app.use(express.json());

const uri = Process.env.uri||'mongodb+srv://divyraj:19992000.Dr@cluster0.pv8ur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.use('/routes/user/',rout);
app.use('/routes/friend/',user_interaction);
app.use('/routes/post/',interaction);
app.use('/routes/comm/',comm)
const conn=mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("connected to db");
    })
    .catch(()=>{
        console.log("not connected");
    });


const port=Process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`listening at ${port}`);
})

