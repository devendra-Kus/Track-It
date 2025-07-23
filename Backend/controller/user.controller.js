import { genrateToken } from "../middleware/jwt.auth.middle.js";
import { Attendance } from "../model/attendance.model.js";
import { Holiday } from "../model/holiday.model.js";
import { Leave } from "../model/leave.model.js";
import { User } from "../model/user.model.js";
import mongoose from "mongoose";
import { Batch } from "../model/batch.model.js";

//LOGIN USER
export const loginAction = async (req, res) => {
    let { uniquekey, email, password } = req.body;
    try {
        const userArr = await User.findOne({ uniquekey });

        const user = userArr.users.find((element) => element.email === email);
        if (!user)
            return res.status(401).json({ message: "user not found" });

        if (password == user.password) {
            const payload = {
                admin_id : userArr.admin_id,
                username: user.username,
                name: user.name,
                email: user.email,
                password: user.password,
                batch_id: userArr.batch_id,
               id : user._id
            }
            // console.log(payload);
            const token = genrateToken(payload);
            return res.status(200).json({ message: "login sucess", token: token ,flag:true});
        }
        return res.status(401).json({message:`password not match`});
    } catch (err) {
        return res.status(500).json({message:`server issue ${err}`});
    }
}

//MARK ATTENDaNCE
export const markAttendance = async (req, res) => {
    let { email, batch_id } = req.key;
    let { Date, status } = req.body;
    try {
        const entrylist = await Attendance.findOne({ batchId: batch_id, date: Date });

        if (!entrylist)
            return res.status(404).json({ message: "batch not found" });

        const userEntry = entrylist.attendance.find(element => element.email === email);

        if (!userEntry) {
            return res.status(404).json({ message: "User not found in attendance list" });
        }
        userEntry.status = status;

        await entrylist.save();
        return res.status(200).json({ message: "Attendance marked successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: "internal server", err })
    }
}

//GET ATTENDaNCE 
export const view = async (req, res) => {
    let { batch_id, email } = req.key;

    try {
        const result = await Attendance.aggregate([
            {
                $match: {
                    batchId: new mongoose.Types.ObjectId(batch_id)
                }
            },
            { $unwind: "$attendance" },
            {
                $match: {
                    "attendance.email": email
                }
            },
            {
                $project: {
                    date: 1,
                    batchId: 1,
                    attendance: 1
                }
            }
        ]);
        return res.status(200).json({ list  : result });
    }
    catch (err) {
        return res.status(500).json({ Error: err });
    }
}

//DETAILS
export const details = async (req, res) => {
    let { batch_id, email } = req.key;
    try {
        const user = await User.findOne({ batch_id });
        const detail = user.users.find((element) => element.email === email);
        return res.status(200).json({ details: detail });
    } catch (err) {
        return res.status(500).json({ Error: `internal server issuse ${err}` });
    }
}

//UPDATE DETAILS
export const updateDetail = async(req,res)=>{
    let {password} = req.body;
    let { batch_id, email } = req.key;
    try {
      const userDoc = await User.findOne({ batch_id });
       if (!userDoc) {
      return res.status(404).json({ message: "No user document found with this batch_id." });
    }
    const userIndex = userDoc.users.findIndex(user => user.email === email);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User with this email not found in users array." });
    }
    userDoc.users[userIndex].password = password;
    await userDoc.save();
    res.status(200).json({ message: "Password updated successfully." });

      
    } catch (error) {
         res.status(500).json({ message: "Server error", error: error.message });
    }
}

// APPLY FOR LEAVE 
export const leave =async (req,res)=>{
    let name = req.key.name;
    let email = req.key.email;
    let admin_id = req.key.admin_id;
    let batch_id = req.key.batch_id;
    let batchName;
    const { reason, from, to, type } = req.body;
    try {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
      if (fromDate < today || toDate < today) {
      return res.status(400).json({ error: "Leave dates must be in the future" });
    }
    if (fromDate > toDate) {
      return res.status(400).json({ error: "'From' date cannot be after 'To' date" });
    }

    const batches = await Batch.findOne({ admin_id });
     if (batches) {
         const batch = batches.batch_col.find((element) => element._id == batch_id);
         if (!batch)
            return res.status(400).json({ message: "batch not found" });
         batchName = batch.name;
      }

     const existing = await Leave.findOne({ name,email,from: fromDate, to: toDate });
    if (existing) {
      return res.status(400).json({ error: "Leave already applied for this date range" });
    }
     const leave = await Leave.create({
      admin_id,
      batchName,
      name,
      email,
      reason,
      from: fromDate,
      to: toDate,
      type
    });
        return res.status(200).json({ message: "Leave request submitted successfully", leave });

    }
    catch(err){
          console.error(err);
    res.status(500).json({ error: "Server error while applying leave" });  
    }
}
//Get holiday
export const holiday =async (req,res)=>{
  let batch_id = req.key.batch_id;
  let admin_id = req.key.admin_id;

  try{
      const holidays = await Holiday.find({batch_id,admin_id}).sort({createdAt: -1});
      if(!holidays){
        return res.status(404).json({message:"holiday not found"})
      }
    return res.status(200).json({holidays});
  }
  catch(err){
   return res.status(500).json({Error : err});
  }
}

//Get Leaves 
export const getLeave = async(req,res)=>{
   const {admin_id,batch_id,email} = req.key;
   let batchName;

   try{
    const batches = await Batch.findOne({ admin_id });
     if (batches) {
         const batch = batches.batch_col.find((element) => element._id == batch_id);
         if (!batch)
            return res.status(400).json({ message: "batch not found" });
         batchName = batch.name;
      }
      const leaves = await Leave.find({batchName,admin_id,email});
      if(!leaves){
        return res.status(404).json({message:"Leaves not found"})
      }
      return res.status(200).json({Leave:leaves});
   }
   catch(err){
   return res.status(500).json({error:err});
   }
}
//get count

export const count =async (req,res)=>{
    const userId = req.key.id;
   try{
const statusCounts = await Attendance.aggregate([

  { $match: { "attendance.userId":new mongoose.Types.ObjectId(userId) } },

 
  { $unwind: "$attendance" },

  { $match: { "attendance.userId":new mongoose.Types.ObjectId(userId) } },


  {
    $group: {
      _id: "$attendance.status",  
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      status: "$_id",
      count: 1
    }
  }
]);

res.status(200).json({message:statusCounts});
}
catch(err){
    console.log(err)
}
}
