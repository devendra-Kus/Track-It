import { Admin } from "../model/admin.model.js"
import bcrypt from "bcryptjs";
import { Batch } from "../model/batch.model.js";
import { genrateToken } from "../middleware/jwt.auth.middle.js";
import nodemailer from "nodemailer";
import xlsx, { read } from "xlsx";
import { User } from "../model/user.model.js";
import mongoose from "mongoose";
import { Attendance } from "../model/attendance.model.js";
import { Otp } from "../model/Otp.js";
import { Holiday } from "../model/holiday.model.js";
import { Leave } from "../model/leave.model.js";
import fs from "fs";

//SIGN-UP WITH JWT AND EMAIL VERIFICATION

export const SignUpAction = async (req, res) => {
   const { email, name, password, institute } = req.body;

   const dup = await Admin.findOne({ email });
   if (dup) return res.status(409).json({ message: "User Already Exists" });

   const otp = Math.floor(100000 + Math.random() * 900000).toString();
   const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
   const saltkey = bcrypt.genSaltSync(12);
   const hashedPassword = bcrypt.hashSync(password, saltkey);

   await Otp.deleteMany({ email });
   await Otp.create({ email, otp, expiresAt, name, password: hashedPassword, institute });

   const emailSent = await sendEmail(email, "otp", otp);
   if (!emailSent) return res.status(500).json({ message: "Failed to send OTP" });

   return res.status(200).json({ message: "OTP sent to your email" });
};

//verify

export const VerifyOtpAndCreateAdmin = async (req, res) => {
   const { email, otp } = req.body;

   const otpData = await Otp.findOne({ email, otp });
   if (!otpData) return res.status(400).json({ message: "Invalid OTP" });

   if (otpData.expiresAt < new Date()) {
      await Otp.deleteMany({ email });
      return res.status(400).json({ message: "OTP expired" });
   }

   const { name, password, institute } = otpData;

   const newAdmin = await Admin.create({ name, email, password, institute });

   await Otp.deleteMany({ email });

   const token = genrateToken({
      id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      institute: newAdmin.institute
   });

   return res.status(200).json({ message: "Signup Successful", token, user: newAdmin });
};


//SIGN-IN THROUGH BYCRYPT PASS AND JWT GENRATION 
export const SignInAction = async (req, res) => {
 
   try{
        let { email, password, institute } = req.body;
 let user = await Admin.findOne({ email, institute });
   if (!user)
      res.status(400).json({ message: "unauthorized user" });
   if (user) {
      let status = bcrypt.compareSync(password, user.password);
      if (!status)
         res.status(401).json({ message: "Password not match" })
      const payload = {
         id: user.id,
         name: user.name,
         institute: user.institute,
         email: user.email
      }
      const token = genrateToken(payload);
      return res.status(200).json({ message: "login sucess", token: token, flag: true });
   }
   }
   catch(err){
      console.error("SignInAction error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
   }
  
}

//SENDING THE MAILS
const sendEmail = (toEmail, use, uniqueKey) => {
   return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASSWORD
         }
      });
      let mailOptions;
      if (use === "forget") {
         mailOptions = {
            from: process.env.GMAIL_ID,
            to: toEmail,
            subject: "Reset Password",
            subject: "Password Reset OTP",
            html: `<p>Your OTP for password reset is: <b>${uniqueKey}</b></p><p>Valid for 5 minutes</p>`
         };
      }

      if (use === "otp") {
         mailOptions = {
            from: process.env.GMAIL_ID,
            to: toEmail,
            subject: 'OTP for Account Verification',
            html: `<h4>Hello Admin,</h4>
          <p>Your OTP is:</p>
          <h2>${uniqueKey}</h2>
          <p>This OTP is valid for 5 minutes.</p>
          <br/>
          <p>Thanks,</p>
          <b>Backend API Team</b>`
         };
      }
      if (use == "User") {
         mailOptions = {
            from: process.env.GMAIL_ID,
            to: toEmail,
            subject: 'Account Verification',
            html: `<h4>Dear Student</h4>
          <p>You are successfully registered</p>
          <p><b>Click Link on below button to verify account</b></p>
          <p>
           <form method="post" action=${process.env.MAIL_PATH}>
            <input type="hidden" value="${toEmail}" name="email"/>
             <span><b>Unique key is  :</b> <p>${uniqueKey}</p>  </span>
            <p>password is welcome</p>
            <button type="submit" style="background-color:mediumseagreen;width:200px;height:60px;color:white;">Verify</button>
           </form>
          </p>
          <h6>Thanks</h6>
          `
         };
      }
      transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
            reject(false);
         } else {
            resolve(true);
         }
      });
   });
}

//ADMIN CREATE BATCHES 
export const BatchAction = async (req, res) => {
   let { name } = req.body;
   let admin_id = req.key.id;

   try {
      let batch = await Batch.findOne({ admin_id });
      if (batch) {
         let status = batch.batch_col.some((element) => {
            return name == element.name;
         });

         if (status) {
            return res.status(200).json({ message: "batch already added" });
         }
         batch.batch_col.push({ name });
         await batch.save();
         return res.status(201).json({ message: "Batch created successfully" });

      }
      else {
         await Batch.create({ admin_id, batches: [{ name }] });
         return res.status(201).json({ message: "batch created successfully.." });
      }

   }
   catch (err) {
      console.log(err);
   }
}

//DELETE BATCHES 
export const removeBatch = async (req, res) => {
   let name = req.params.name;
   let admin_id = req.key.id;

   try {
      const batches = await Batch.findOne({ admin_id });
      if (!batches)
         return res.status(404).json({ message: "Admin dont have batches" });
      let index = batches.batch_col.findIndex((element) => element.name === name);

      if (index === -1)
         return res.status(404).json({ message: "batch not found" });
      batches.batch_col.splice(index, 1);
      batches.save();
      return res.status(200).json({ message: "batch success fully remove" })
   }
   catch (err) {
      return res.status(500).json({ Error: `internal server error ${err}` });
   }

}

//VIEW THE BATCH
export const viewBatch = (req, res) => {
   let admin_id = req.key.id;

   Batch.findOne({ admin_id }).then((result) => {
      return res.status(200).json({ batches: result.batch_col })
   }).catch((err) => {
      return res.status(500).json({ Error: err });
   })

}

// READING EXEL SHEET AND ADD USERS



export const exel = async (req, res) => {
   try {
      let admin_id = req.key.id;
      console.log(req.body.name);

      let batch_id;
      let batch = await Batch.findOne({ admin_id });

      if (batch) {
         batch.batch_col.filter((element) => {
            if (element.name == req.body.name) {
               batch_id = element.id;
            }
         })
      }

      const filepath = req.file.path;
      const workbook = xlsx.readFile(filepath);
      const sheetName = workbook.SheetNames[0];
      const rawData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const sheetData = Array.from(
         new Map(
            rawData.map((u) => [u.email.trim().toLowerCase(), { ...u, email: u.email.trim().toLowerCase() }])
         ).values()
      );

      const uniquekey = `Dh-${req.key.institute}-k${req.body.name}`;
      console.log(batch_id);
      let batchk = await User.findOne({ uniquekey });

      if (!batchk) {
         console.log("batch not found");
         let flag = await User.insertOne({ admin_id, batch_id, uniquekey, users: sheetData });
         console.log(flag);

         var valid = [];
         try {
            for (let u of sheetData) {
               let status = await sendEmail(u.email, "User", uniquekey);
               if (status) {
                  console.log(valid.push(u.email));
               }
            }
         }
         catch (err) {
            console.log(err + " in this");
         }

         fs.unlink(filepath, (err) => {
            if (err) {
               console.log("file not deleted", err);
            } else {
               console.log("file deleted");
            }
         });

         return res.status(200).json({ data: sheetData });
      }

      let emails = new Set(batchk.users.map((element) => element.email.toLowerCase()));
      const filerarray = sheetData.filter((element) => !emails.has(element.email.toLowerCase()));

      const uniqueFresh = Array.from(
         new Map(filerarray.map((u) => [u.email, u])).values()
      );

      const newSheet = [...batchk.users, ...uniqueFresh];
      batchk.users = newSheet;
      await batchk.save();

      fs.unlink(filepath, (err) => {
         if (err) {
            console.log("file not deleted", err);
         } else {
            console.log("file deleted");
         }
      });

      res.status(200).json({ message: "user added " });
   }

   catch (err) {
      console.log(err + "userissue");

  
      const filepath = req.file?.path;
      if (filepath) {
         fs.unlink(filepath, (e) => {
            if (e) console.log("file delete failed in catch", e);
            else console.log("file deleted in catch");
         });
      }

      res.status(500).json({ message: "something went wrong" });
   }
}


//FETCH ALL USER FROM BATCH 
export const fetchUser = async (req, res) => {
   let name = req.params.name;
   let admin_id = req.key.id;
   let batch_id;

   try {
      const batches = await Batch.findOne({ admin_id });

      if (batches) {
         const batch = batches.batch_col.find((element) => element.name == name);
         if (!batch)
            return res.status(400).json({ message: "batch not found" });
         batch_id = batch.id;

      }
      const user = await User.findOne({ admin_id, batch_id });
      if (!user) {
         return res.status(500).json({ message: "users not found" });
      }
      return res.status(200).json({ message: user.users });
   }
   catch (err) {
      console.log(err);
   }
}

//GET ONE USER DETAIL
export const getOne = async (req, res) => {
   let { name, email } = req.params;
   let admin_id = req.key.id;
   let batch_id;

   try {
      const batches = await Batch.findOne({ admin_id });

      if (batches) {
         const batch = batches.batch_col.find((element) => element.name == name);
         if (!batch)
            return res.status(400).json({ message: "batch not found" });
         batch_id = batch.id;

      }
      const result = await User.aggregate([
         {
            $match: {
               batch_id: new mongoose.Types.ObjectId(batch_id),
               admin_id: new mongoose.Types.ObjectId(admin_id)
            }
         },
         { $unwind: "$users" },
         {
            $match: {
               "users.email": email
            }
         },
         {
            $project: {
               admin_id: 1,
               batch_id: 1,
               users: 1
            }
         }
      ]);
      return res.status(200).json({ message: result });
   }
   catch (err) {
      console.log(err);
   }
}

// VIEW ATTENDANCE BY DATE AND BATCH NAME ONE DAY
export const viewAttendance = async (req, res) => {
   let { name, date } = req.params;

   let admin_id = req.key.id;
   let batch_id;

   try {
      const batches = await Batch.findOne({ admin_id });

      if (batches) {
         const batch = batches.batch_col.find((element) => element.name == name);
         if (!batch)
            return res.status(400).json({ message: "batch not found" });
         batch_id = batch.id;
      }
      console.log(`${batch_id}  ${date}`)
      const entry = await Attendance.findOne({ batchId: batch_id, date });
      console.log(entry);
      if (!entry) {
         return res.status(400).json({ error: "entery not found" });
      }

      return res.status(200).json({ attendance: entry });
   }
   catch (err) {
      return res.status(500).json({ Error: err });
   }
}

// VIEW ALL ATTENDANCE OF ONE USER BY EMAIL 
export const viewAttendanceOne = async (req, res) => {
   let { email, name } = req.params;

   let admin_id = req.key.id;
   let batch_id;

   try {
      const batches = await Batch.findOne({ admin_id });

      if (batches) {
         const batch = batches.batch_col.find((element) => element.name == name);
         if (!batch)
            return res.status(400).json({ message: "batch not found" });
         batch_id = batch.id;
      }

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
      return res.status(200).json({ message: result });

   } catch (err) {
      return res.status(500).json({ error: err })
   }
}

//ADD ONE USER
export const addOneUser = async (req, res) => {
   let { name, email, password, batchName } = req.body;
   let admin_id = req.key.id;


   let batch_id, uniquekey;
   try {
      const batches = await Batch.findOne({ admin_id });
      if (batches) {
         const batch = batches.batch_col.find((element) => element.name == batchName);

         if (!batch) {
            return res.status(400).json({ message: "batch not found" });
         }
         batch_id = batch.id;

      }

      const userData = await User.findOne({ admin_id, batch_id });

      console.log(userData);
      if (!userData)
         return res.status(404).json({ message: "Batch not found" });

      let dup = userData.users.find((element) => element.email == email);

      if (dup)
         return res.status(200).json({ message: `user is already exist ${dup}` });
      await sendEmail(email, "User", userData.uniqueKey);

      userData.users.push({
         username: "helo",
         name: name,
         email: email,
         password: password
      });

      await userData.save();
      return res.status(200).json({ message: "user Added success fully" });
   }
   catch (err) {
      return res.status(500).json({ error: err });
   }
}

// DELETE ONE USER
export const removeOne = async (req, res) => {
   let { name, email } = req.params;
   let admin_id = req.key.id;
   let batch_id;

   try {
      const batches = await Batch.findOne({ admin_id });
      if (!batches)
         return res.status(404).json({ message: `batch not found` });

      let batch = batches.batch_col.find((element) => element.name == name);
      batch_id = batch.id;

      const user = await User.findOne({ admin_id, batch_id });
      if (!user)
         return res.status(200).json({ message: `batch is empty` });
      let index = user.users.findIndex((element) => element.email === email);

      if (index === -1)
         return res.status(404).json({ message: "user not found" });
      user.users.splice(index, 1);
      user.save();
      return res.status(200).json({ message: "user Deleted successfully" });
   }
   catch (err) {
      return res.status(500).json({ Error: err });
   }

}

//ALL PRESENT USERS 
export const allPresentUser = async (req, res) => {
   let { name, date } = req.params;

   let admin_id = req.key.id;
   let batch_id;

   try {
      const batches = await Batch.findOne({ admin_id });

      if (batches) {
         const batch = batches.batch_col.find((element) => element.name == name);
         if (!batch)
            return res.status(400).json({ message: "batch not found" });
         batch_id = batch.id;
      }
      console.log(`${batch_id}  ${date}`)
      const entry = await Attendance.findOne({ batchId: batch_id, date });
      console.log(entry);
      if (!entry) {
         return res.status(400).json({ error: "entery not found" });
      }

      const present = entry.attendance.filter((element) => { return element.status == "Present" })

      return res.status(200).json({ attendance: present });
   }
   catch (err) {
      return res.status(500).json({ Error: err });
   }
}

//All ABSENT USERS
export const allAbsenttUser = async (req, res) => {
   let { name, date } = req.params;

   let admin_id = req.key.id;
   let batch_id;

   try {
      const batches = await Batch.findOne({ admin_id });

      if (batches) {
         const batch = batches.batch_col.find((element) => element.name == name);
         if (!batch)
            return res.status(400).json({ message: "batch not found" });
         batch_id = batch.id;
      }
      console.log(`${batch_id}  ${date}`)
      const entry = await Attendance.findOne({ batchId: batch_id, date });
      console.log(entry);
      if (!entry) {
         return res.status(400).json({ error: "entery not found" });
      }

      const absent = entry.attendance.filter((element) => { return element.status == "Absent" })

      return res.status(200).json({ attendance: absent });
   }
   catch (err) {
      return res.status(500).json({ Error: err });
   }
}

//USER COUNT
export const UserList = async (req, res) => {
   let admin_id = req.key.id;

   try {
      const userCount = await User.aggregate([
         {
            $match: {
               admin_id: new mongoose.Types.ObjectId(admin_id)
            }
         },
         {
            $project: {
               count: { $size: "$users" }
            }

         },
         {
            $group: {
               _id: null,
               total: { $sum: "$count" }
            }
         }
      ]);

      if (!userCount)
         res.status(404).json({ message: "oops data not found" });

      res.status(200).json({ count: userCount });

   }
   catch (err) {
      res.status(500).json({ error: err })
   }
}

//PROFILE ADMIN
export const profile = async (req, res) => {

   let { email, admin_id } = req.key;
   try {
      console.log(admin_id);
      let user = await Admin.findOne({ admin_id, email });
      console.log(user);
      if (!user) {
         return res.status(500).json({ message: "internal server issue" });
      }
      user.password = undefined;
      return res.status(200).json({ profile: user });
   }
   catch (err) {
      console.log(err)
   }
}

//FORGET PASSWORD

export const forgetPassword = async (req, res) => {
   let { email } = req.body;
   let user = await Admin.findOne({ email });
   if (!user) {
      return res.status(404).json({ message: "user not found" });
   }
   const otp = Math.floor(100000 + Math.random() * 900000).toString();
   const expiresAt = new Date(Date.now() + 5 * 60 * 10000);
   await Otp.deleteMany({ email });
   await Otp.create({ email, otp, expiresAt });

   const mail = await sendEmail(email, "forget", otp);
   if (!mail) {
      return res.status(500).json({ message: "mail not sent" });

   }
   return res.status(200).json({ message: "mail send successfully" });
};

export const reset = async (req, res) => {
   const { email, otp, password } = req.body;

   let user = await Otp.findOne({ email, otp });
   if (!user) {
      return res.status(400).json({ message: "user not found" });
   }

   if (user.expiresAt < new Date()) {
      await Otp.deleteMany({ email });
      return res.status(400).json({ message: "OTP is expired" });
   }

   const salt = bcrypt.genSaltSync(12);
   let pass = bcrypt.hashSync(password, salt);

   await Admin.updateOne({ email }, { $set: { password: pass } });
   await Otp.deleteMany({ email });

   return res.status(200).json({ message: "Password updated successfully" });

}

//HOLIDAY DECLARE
export const holiday = async (req, res) => {
   let { title, date, description, batchName } = req.body;
   let batch_id;
   let admin_id = req.key.id;
   const today = new Date();
   today.setHours(0, 0, 0, 0);

   const newdate = new Date(date);
   if (newdate < today) {
      return res.status(200).json({ message: "Please enter up coming date" });
   }

   try {
      const batches = await Batch.findOne({ admin_id });
      if (batches) {
         const batch = batches.batch_col.find((element) => element.name == batchName);

         if (!batch) {
            return res.status(400).json({ message: "batch not found" });
         }
         batch_id = batch.id;

      }
      const holi = await Holiday.findOne({ date: newdate, admin_id, batch_id });
      if (holi) {
         return res.status(500).json({ message: "Already a holiday" })
      }
      const leave = new Holiday({ admin_id, batch_id, title, description, date: newdate });
      await leave.save();
      return res.status(200).json({ message: "Holiday declared" })
   }
   catch (err) {
      return res.status(500).json({ Error: "internal server issue", err });
   }
}

//HOLIDAY GET
export const holiGet = async (req, res) => {
  const admin_id = req.key.id;

  try {
    const holidays = await Holiday.find({ admin_id })
      .populate("batch_id", "name"); 
    res.status(200).json({ list: holidays });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//leaves 
export const leave = async (req, res) => {
   const admin_id = req.key.id;

   try {
      const leaves = await Leave.find({ admin_id });
      if (!leaves || leaves.length === 0) {
         return res.status(404).json({ message: "No leaves found" });
      }

      return res.status(200).json({ message: leaves });

   } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
   }
};

//leave approver 

export const leaveStatus = async (req, res) => {
   try {
      const { status } = req.body;
      const id = req.params.id;
      console.log(status)
      if (!["Approved", "Rejected", "Pending"].includes(status)) {
         return res.status(400).json({ message: "Invalid status value" });
      }

      const leave = await Leave.findByIdAndUpdate(
         req.params.id,
         { status },
         { new: true } // updated doc return ho
      );

      if (!leave) return res.status(404).json({ message: "Leave not found" });
      return res.json(leave);
   } catch (err) {
      return res.status(400).json({ message: err.message });
   }
};
