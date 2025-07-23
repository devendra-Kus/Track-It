import mongoose from "mongoose";

const BatchSchema = new mongoose.Schema({
     admin_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "admin"
     },
     batch_col: [{
      name :{type : String,
           required : true
         }
       }]

});

export const Batch = new mongoose.model("batch",BatchSchema);