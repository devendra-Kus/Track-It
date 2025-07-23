
import Sidebar from "./Sidebar";
import "./User.css";

import { Outlet } from "react-router-dom";
const UserHome = ()=>{
    return <>
    <Sidebar/>
    <Outlet/>
    </>
}

export default UserHome;