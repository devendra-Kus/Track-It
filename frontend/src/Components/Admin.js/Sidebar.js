// components/AdminDashboard/Sidebar.js
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import "./AdminDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import FreeCancellationSharpIcon from '@mui/icons-material/FreeCancellationSharp';
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/LoginSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
  const handleLogout = () => {
   dispatch(setUser({token:null,flag:false}));
   
  };
  return (
    <div className="sidebar  ">
      <h3 className="text-center mb-4 text-white">
        <i className="bi bi-speedometer2 me-3"></i><Link to="/admin" className="text-white " style={{textDecoration:"none"}}>Dashboard</Link> 
      </h3>
      <nav className="nav flex-column">
        <Link to="batchList" className="nav-link text-white"><i className="bi bi-people-fill me-2"></i>Batch</Link>
        <Link to="genrate" className="nav-link text-white"><i className="bi bi-qr-code-scan me-2"></i>Generate QR</Link>
        <Link to="profile" className="nav-link text-white"><i className="bi bi-person-circle me-2"></i>View Profile</Link>
        <Link to="attendence" className="nav-link text-white"><i className="bi bi-calendar-check me-2"></i>View Attendance</Link>
        <Link to="userAdd" className="nav-link text-white"><PersonAddOutlinedIcon/> Manage user</Link>   
        <Link to="holiday" className="nav-link text-white"><i class="bi bi-calendar4-event"></i>  Holiday</Link> 
        <Link to="user" className="nav-link text-white"><i className="bi bi-person-circle me-2"></i>User</Link>
        <Link to="leave" className="nav-link text-white" ><FreeCancellationSharpIcon/>Leaves</Link>
        <Link  onClick={handleLogout} className="nav-link text-white"><i className="bi bi-box-arrow-right me-2"></i>Logout</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
