import { Batch } from "../model/batch.model.js";
import { User } from "../model/user.model.js";
import { Attendance } from "../model/attendance.model.js";

//QR GENRATION WITH ATTENDaNCE

export const QRGenAction = async(req, res) => {
    let { name } = req.body;
    let admin_id = req.key.id;
   try{
    //finding the batch 

    let batch = await Batch.findOne({ admin_id });
    let batch_id;
    if (batch) {
        batch.batch_col.filter((element) => {
           if ( name === element.name)
                 batch_id = element.id;
            console.log(element.name);
        })
    }
   
    if(!batch_id){
        return res.status(401).json({error : "Batch is not found"});
    }
    const use = await User.findOne({admin_id,batch_id});  
    console.log(`${admin_id}  ${batch_id}`);
    if(!use){
      return res.status(400).json({error:"Batch is empty"});
    }
    // creating the attendance 
    const attendanceEntries = use.users.map(user => ({
        userId: user._id,
        email: user.email,
        status: "Absent",
        checkInTime: null
      }));
      //make entry
      const date = new Date();
      date.setHours(0,0,0,0);
 
      const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);


      const entry =  await Attendance.updateOne(
        { batchId: batch_id,date : newDate}, 
        { $set: { attendance: attendanceEntries } },
        { upsert: true }
      );
      if(entry){
        res.status(200).json({message : "attendece done",k : entry});
      }
    }
    catch(err){
        console.log(err);
    }

}

