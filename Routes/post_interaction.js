const mongoose = require('mongoose');
const express = require('express');
const interaction = express.Router();
const jwt = require('jsonwebtoken');
const {Post} = require('../models/post.js');
const auth = require('../Authentication/auth.js');
const {response} = require("express");
const fileUpload = require('express-fileupload')
console.log("ppi");

const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const mongodb=require('mongodb');
interaction.get("/",(req,res)=>{
    res.send("hello");
})

async function createpost(poost){



    try {

        const u=await poost.save();
        console.log("loh + "+u._id);
        return u;
    }
    catch (err){
        console.log(err.message);

    }
}
interaction.post('/add_post/',(req, res) => {
    let lost=new Post({
        caption:req.body.caption,
        email:req.body.email,
        image:"Not available",
    })
    createpost(lost).then(ussr=>{

        res.status(200).send("post saved");
        console.log("post saved hello");
    }).catch((err)=>{
        res.status(400).send(err.message);

    })
});
module.exports = interaction;