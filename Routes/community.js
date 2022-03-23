const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken');
const {User,hash}=require('../models/user.js');
const {Post} = require('../models/post.js');
let pst=[]
function paginatedResults() {
    return async (req, res, next) => {
        console.log("middleware");
        const page = parseInt(req.body.page)
        const limit = 5
        let email=req.body.email
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        let user=await User.findOne({email:email})

        let results = []


        let friends=user.friends


        try {
            for (let i in friends){

                res = await Post.find({email:friends[i]}).limit(limit).skip(startIndex).exec()
                pst.push(res)


            }




            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}
router.get('/Get_posts/',paginatedResults(),(req,res)=>{

    res.json(pst)
})
module.exports=router;