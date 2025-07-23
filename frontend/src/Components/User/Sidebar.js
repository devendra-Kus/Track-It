import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import QrCodeScannerSharpIcon from '@mui/icons-material/QrCodeScannerSharp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';

import "./User.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/LoginSlice";

const Sidebar = () => {
  const linkStyle = {
    color: "#e0f7fa",
    transition: "0.3s",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: 500,
    letterSpacing: "0.5px",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logOut = ()=>{
     dispatch(setUser({token:null,flag:false}));
     navigate("/");
  }

  const hoverStyle = (e) => (e.currentTarget.style.background = "#1a2a3c");
  const outStyle = (e) => (e.currentTarget.style.background = "transparent");

  return (
    <div
      className="sidebar d-flex flex-column p-4"
      style={{
        minHeight: "100vh",
        width: "240px",
        position: "fixed",
        top: 0,
        left: 0,
        background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
        boxShadow: "2px 0 12px rgba(0, 0, 0, 0.4)",
      }}
    >
      <h3 className="text-white mb-4 text-center" style={{ fontWeight: 700 }}>
        <Link
          to="/user"
          className="text-white"
          style={{ textDecoration: "none", fontSize: "1.4rem" }}
        >
          📊 Dashboard
        </Link>
      </h3>

      <nav className="nav flex-column gap-3">
        <Link
          to="Scan"
          className="nav-link d-flex align-items-center gap-3 text-decoration-none"
          style={linkStyle}
          onMouseOver={hoverStyle}
          onMouseOut={outStyle}
        >
          <QrCodeScannerSharpIcon /> <span>Scan</span>
        </Link>
        <Link
          to="attendence"
          className="nav-link d-flex align-items-center gap-3 text-decoration-none"
          style={linkStyle}
          onMouseOver={hoverStyle}
          onMouseOut={outStyle}
        >
          <AssessmentOutlinedIcon /> <span>View Attendance</span>
        </Link>
        <Link
          to="leave"
          className="nav-link d-flex align-items-center gap-3 text-decoration-none"
          style={linkStyle}
          onMouseOver={hoverStyle}
          onMouseOut={outStyle}
        >
          <AssessmentOutlinedIcon /> <span>Leave</span>
        </Link>
        <Link
          to="profile"
          className="nav-link d-flex align-items-center gap-3 text-decoration-none"
          style={linkStyle}
          onMouseOver={hoverStyle}
          onMouseOut={outStyle}
        >
          <AccountCircleOutlinedIcon /> <span>Profile</span>
        </Link>
        <Link
          to="holiday"
          className="nav-link d-flex align-items-center gap-3 text-decoration-none"
          style={linkStyle}
          onMouseOver={hoverStyle}
          onMouseOut={outStyle}
        >
          <CalendarMonthIcon /> <span>Holiday</span>
        </Link>
        <Link
         onClick={logOut}
          className="nav-link d-flex align-items-center gap-3 text-decoration-none mt-auto"
          style={{
            ...linkStyle,
            color: "#ff867c",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#3e1f1f")}
          onMouseOut={outStyle}
        >
          <LogoutIcon /> <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;