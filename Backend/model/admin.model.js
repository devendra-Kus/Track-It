import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name:{
        type : String,
        trim: true,
        required : true
    },

    email :{
        type : String,
        unique : true,
        required : true
    },

    institute :{
        type : String,
        required: true,
        unique:true,

    },
    password :{ 
        type : String,
        required : true
    }
      
});


export const  Admin = mongoose.model("admin",AdminSchema); 