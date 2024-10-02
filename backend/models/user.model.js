import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullname:{
        type:"string",
        required:true,
    },

    username:{
        type:"string",
        required:true,
        unique:true
    },

    email:{
        type:"string",
        required:true,
        unique:true
    },

    phone_number:{
        type:"string",
        required:true,
        unique:true
    },

    password:{
        type:"string",
        minlength:6,
        required:true
    },
    gender:{
        type:"string",
        enum:["male", "female"],
        required:true
    },

    profilePic:{
        type:"string",
        default:" "
    }
    
},
//created and updated at (member since...)
{timestamps:true});

const User= mongoose.model("User", userSchema);

export default User;