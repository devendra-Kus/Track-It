import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./AdminDashboard.css"; 
import 'react-calendar/dist/Calendar.css';
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";


const AdminDashboard = () => {
   
   return <>
   <div className="dashboard-bg">
      <Sidebar />
     <Outlet/>      
    </div></>
  
};

export default AdminDashboard;
