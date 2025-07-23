import mongoose from "mongoose";


 const UserSchema = new mongoose.Schema({
    admin_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "admin",
        required:true
        
    }, 
    
    batch_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "batch"
    },

     uniquekey : {
        type : String,
        unique  : true
     },

    users : [
        {
            username:String,
            name:String,
            email:{
                type : String,
                required : true
            },
            password : String,  
            verify :{
                type : Boolean,
                }
        }
    ]

 });

 export const User = new mongoose.model("user",UserSchema);