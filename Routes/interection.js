const mongoose = require('mongoose');
const express = require('express');
const interaction = express.Router();
const jwt=require('jsonwebtoken');
const {User,hash}=require('../models/user.js');
const auth=require('../Authentication/auth.js');


interaction.put('/send_request/',(req,res)=>{
let requester=req.body.email;
let friend=req.body.request;
    User.updateOne(
        { email:friend },
        { $addToSet: { Requests: [requester] } },
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );

})
interaction.put('/add_friend/',(req,res)=>{
    let requester=req.body.email;
    let friend=req.body.request;
    User.updateOne(
        { email:requester },
        { $addToSet: { friends: [friend] } },

    );
    User.updateOne(
        { email:friend },
        { $addToSet: { friends: [requester] } },

    );

})

module.exports=interaction;