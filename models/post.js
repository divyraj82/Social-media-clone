const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongodb=require('mongodb');

const postSchema = new Schema(
    {
        caption: {
            type:String,
        },
        image: {

            type:String,
        },


        email: {
            type: String,
          required:true,
        },
        PublicVisibility:{
            type:Boolean,
            default:true,
        },

    },

);



const Post=mongoose.model('Post',postSchema);
exports.Post=Post;