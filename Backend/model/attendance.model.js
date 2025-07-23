import mongoose from "mongoose";

const AttendenceSchema = new mongoose.Schema({
     batchId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'batch',
        required : true
     },
     date :{
        type: Date,
        require : true
     },
     attendance : [
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "user",
                required : true
            },
            email:{
                type:String,
                require : true
            },
            status : {
                type : String,
                enum : ["Present","Late","Absent"],
                default : "Absent",
                require : true
            },

           checkInTime : {
             type : Date
           }
        }
     ]

});

AttendenceSchema.index({ batchId: 1, date: 1 }, { unique: true });

export const Attendance = new mongoose.model("attendence",AttendenceSchema);