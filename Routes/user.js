const mongoose = require('mongoose');
const express = require('express');
const rout = express.Router();
const jwt=require('jsonwebtoken');
const {User,hash}=require('../models/user.js');
const auth=require('../Authentication/auth.js');
console.log("op");
let fs = require('fs');

function base64_encode(file) {

    let bitmap = fs.readFileSync(file);

    return new Buffer(bitmap).toString('base64');
}
async function Resisteruser(user){

    console.log("registering");
    try {
        console.log("user = "+user+"bj");
        const u=await user.save();
        console.log("loh + "+u._id);
        return u;
    }
    catch (err){
        console.log(err.message+"saving error");

    }
}
rout.get('/',(req,res)=>{
    res.send("hi");
})
async function user_autentication(email,password){

    try {
        const user=await User.findOne({email:email,password:password});
        if(user)
        {
            return user;
        }
        else
        {
            return new Error().message("Authentication failed");
        }
    }
    catch (err){
        console.log(err.message+"error");

    }
}

rout.post('/signin/',(req,res)=>{

    hash(req.body.password).then(password=>{
        user_autentication(req.body.email,password).then(user=>{
            const token=   jwt.sign({_id:user._id,admin:user.admin,email:user.email},'Store_key_generator');
            res.status(200).send(token);
            console.log(user)
        }).catch(err=>{
            res.status(400).send(err.message+"400");
            console.log(err.message+"400")
        }).catch(err=>{
            res.status(200).send(err.message+"200");
            console.log(err.message+"200")
        })
    })
})

rout.post('/register/',(req,res)=>{

    const us={
        email:req.body.email,
        name:req.body.name,
        password:req.body.password,
        admin:req.body.admin,
        gender:req.body.gender,
    };
    console.log("us = "+req.body.admin+"hhh");

        hash(req.body.password).then(has=>{
            const user=new User({
                email:req.body.email,
                name:req.body.name,
                admin:req.body.admin,
                password:has,
                gender:req.body.gender,
            })
            Resisteruser(user).then(ussr=>{
                const token=   jwt.sign({_id:ussr._id,admin:ussr.admin},'Store_key_generator');//temporary use...will be env
                res.status(200).send(token);
                console.log("user saved hello");
            }).catch((err)=>{
                res.status(400).send(err.message);

            })
        }).catch((err)=>{
            console.log('Hashing failed');
            res.status(400).send("Server Error ( "+err.message+" )");
        })



})



module.exports=rout;
