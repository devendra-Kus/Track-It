import express from "express";
import { jwtAuthMiddle } from "../middleware/jwt.auth.middle.js";
import { loginAction, markAttendance, view, details, updateDetail, leave, holiday, getLeave, count } from "../controller/user.controller.js";

const userRouter = express.Router();

/* 
 VERIFY ACCOUNT 
 EMAIL CORRECTION ✅
  LOGIN VERIFY USER ONLY CAN LOGIN
 PASSWORD UPDATE...................pending
 VIEW USER DETAILS ✅


*/
//check 
userRouter.post("/Login",loginAction);
userRouter.post("/mark",jwtAuthMiddle, markAttendance);
userRouter.get("/view",jwtAuthMiddle,view);
userRouter.get("/details",jwtAuthMiddle,details);

//need to work
userRouter.put("/updateDetail",jwtAuthMiddle,updateDetail); 
userRouter.post("/leave",jwtAuthMiddle,leave);
userRouter.get("/holiday",jwtAuthMiddle,holiday);
userRouter.get("/leave",jwtAuthMiddle,getLeave);
userRouter.get("/count",jwtAuthMiddle,count);



export default userRouter;