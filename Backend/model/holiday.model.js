import mongoose, { model, Schema } from "mongoose";

const HolidaySchema = new mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.ObjectId,
        ref: "admin",
        required: true
    },
    batch_id :{
         type:mongoose.Schema.ObjectId,
         ref:"batch",
         required : true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique: true
    },
    description: { type: String }
},
{
    timestamps: true
});

export const Holiday = new mongoose.model("holiday", HolidaySchema);