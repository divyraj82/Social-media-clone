const mongoose = require('mongoose');
const {Schema } = mongoose;
const bcrypt=require('bcrypt');
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 25,
        },

        email: {
            type: String,
            required: true,
            trim: true,

        },
        password: {
            type: String,
            required: true,
        },
        Profilepic: {
            type: String,
            default:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        },

        gender: {
            type: String,

            required:true,
        },

        story: {
            type: String,
            default: "",
            maxlength: 200,
        },

        friends: [
            {
                type:String,
            },
        ],
        Requests:[
            {
                type:String,
            }
        ],
        admin:{
            type:Boolean,
            default:false,
        }
    },

);

const User=mongoose.model('User',userSchema);
const salt="$2b$10$hnuOCv0tfrWZiyagqe3SH.";
async function hash(value){                                                         //hashing
    console.log("hashing now");


    const hashed=await bcrypt.hash(value,salt);
    // console.log(hashed);
    if(hashed)
        return hashed;
    else
        return new Error().message('Internal error');
}


exports.User=User;

exports.hash=hash;
