import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    name : {type:String ,required:true},
    email:{
                type : String,
                required : true
            },
    admin_id :{type:mongoose.Schema.Types.ObjectId,ref:"admin" ,required:true},
     batchName :{
        type:String,
     },
    reason: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    type: { type: String, enum: ["Sick", "Casual", "Urgent"], default: "Casual" },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
}, {
    timestamps: true
});

export const Leave = mongoose.model("Leave", leaveSchema);
