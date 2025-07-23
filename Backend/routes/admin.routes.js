import express from "express";
import {
    addOneUser,
    allAbsenttUser,
    allPresentUser,
    BatchAction,
    exel,
    fetchUser,
    getOne,
    removeBatch,
    removeOne,
    SignInAction,
    SignUpAction,
    viewAttendance,
    viewAttendanceOne,
    viewBatch, UserList,
    profile,
    VerifyOtpAndCreateAdmin,
    forgetPassword,
    reset,
    holiday,
    holiGet,
    leave,
    leaveStatus
} from "../controller/admin.controller.js";
import { jwtAuthMiddle } from "../middleware/jwt.auth.middle.js";
import upload from "../middleware/multer.middle.js";
import { QRGenAction } from "../controller/attendance.controller.js";



const AdminRoute = express.Router();

//GET ALL USERS ✅
//GET ONE USER ✅
//GET ATTENDECE BY BATCH ONE DAY ✅
//GET ALL ATTENDECE OF ONE USER ✅
//View BATCH ✅
//DELETE BATCH 
//ADD ONE USER  ✅
//DELETE ONEUSER  ✅

//Checked with no issue.
AdminRoute.post("/SignUp", SignUpAction);
AdminRoute.post("/SignIn", SignInAction);
AdminRoute.post("/batch", jwtAuthMiddle, BatchAction);
AdminRoute.get("/batch", jwtAuthMiddle, viewBatch);
AdminRoute.post("/addOneUser", jwtAuthMiddle, addOneUser);
AdminRoute.post("/qr", jwtAuthMiddle, QRGenAction);
AdminRoute.get("/allUser/:name", jwtAuthMiddle, fetchUser);
AdminRoute.get("/getOne/:name/:email", jwtAuthMiddle, getOne);
AdminRoute.delete("/removeBatch/:name", jwtAuthMiddle, removeBatch);
AdminRoute.delete("/removeOne/:name/:email", jwtAuthMiddle, removeOne);
AdminRoute.post("/userBulk", jwtAuthMiddle, upload.single('file'), exel);
AdminRoute.get("/viewAttendance/:date/:name", jwtAuthMiddle, viewAttendance);
AdminRoute.get("/viewAttendanceOne/:name/:email", jwtAuthMiddle, viewAttendanceOne);
AdminRoute.get("/allPresentUser/:date/:name", jwtAuthMiddle, allPresentUser);
AdminRoute.get("/allAbsentUser/:date/:name", jwtAuthMiddle, allAbsenttUser);
AdminRoute.get("/allUser", jwtAuthMiddle, UserList);
AdminRoute.get("/profile", jwtAuthMiddle, profile);

AdminRoute.post("/verify-otp", VerifyOtpAndCreateAdmin);
AdminRoute.post("/forgot", forgetPassword);
AdminRoute.post("/reset", reset);
AdminRoute.post("/holiday", jwtAuthMiddle, holiday);
AdminRoute.get("/holiday", jwtAuthMiddle, holiGet);
AdminRoute.get("/leave", jwtAuthMiddle, leave);
AdminRoute.put("/status/:id",jwtAuthMiddle,leaveStatus);



//uncheced or need to update



export default AdminRoute;  