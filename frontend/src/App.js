import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Components/userAuth/SignUP";
import Signin from "./Components/userAuth/SignIn";
import AdminDashboard from "./Components/Admin.js/AdminDashboard";
import DashboardContent from "./Components/Admin.js/content/Dashboard";
import Home from "./Components/global/Home";
import StickyHeadTable from "./Components/Admin.js/content/Attendence";
import QRcode from "./Components/Admin.js/content/QRcode";
import BatchList from "./Components/Admin.js/content/BatchList";
import Profile from "./Components/Admin.js/content/Profile";
import DeleteBatch from "./Components/Admin.js/content/DeleteBatch";
import UserHome from "./Components/User/UserHome";
import Auth from "./Components/userAuth/Auth";
import DashboardU from "./Components/User/content/DashboardU";
import QRScanner from "./Components/User/content/QRScanner";
import ProfileUser from "./Components/User/content/ProfileUser";
import Attendence from "./Components/User/content/AttendenceUser";
import ManageUser from "./Components/Admin.js/content/ManageUser";
import Leave from "./Components/Admin.js/content/leave";
import Holiday from "./Components/Admin.js/content/Holiday";
import HolidayU from "./Components/User/content/Holiday";
import LeaveU from "./Components/User/content/Leave";
import VerifyOtp from "./Components/userAuth/Verify-Otp";
import User from "./Components/Admin.js/content/User";
import ForgetPassword from "./Components/userAuth/Forget";


const App =()=>{
   
  return <>
    {/* {/*
    <AdminSignin/> 
    <AdminDashboard /> */}
    
    <Routes>
      {/* Base router  */}
      <Route path="/" element={<Home/>} /> 
      <Route path="/sign-up" element={<Signup/>} />
      <Route path="/sign-in" element={<Signin/>} />
      <Route path="/VerifyOtp" element={<VerifyOtp/>}/>
      <Route path="/forgot" element={<ForgetPassword />} />

     {/* USER ROUTER */}

      <Route path="/user" element ={<Auth><UserHome/></Auth> }>
        <Route index element= {<DashboardU/>} />
        <Route path="Scan" element={<QRScanner/>}/>
        <Route path="profile" element={<ProfileUser/>} />
        <Route path="attendence" element = {<Attendence/>} />
        <Route path="leave" element={<LeaveU/>} />
        <Route path="holiday" element={<HolidayU/>} />
      </Route>

     {/* ADMIN ROUTER */}

      <Route path="/admin" element={<Auth><AdminDashboard/></Auth> }>
        <Route index element = {<DashboardContent/>} />
         {/* <Route path="create" element = {<CreateBatch/>} /> */}
         <Route path="attendence" element = {<StickyHeadTable />} />
          <Route path="genrate" element = {< QRcode />} />
          <Route path="batchList" element = {< BatchList />} />
          <Route path="profile" element = {< Profile />} />
          <Route path="delete" element = {< DeleteBatch />} />
          <Route path="userAdd" element = {<ManageUser/>} />
          <Route path="holiday" element = {<Holiday />} />
          <Route path="leave" element = {<Leave />} />
          <Route path="user" element = {<User />}/>
        </Route>
     </Routes>
    
  </>
}
export default App;
