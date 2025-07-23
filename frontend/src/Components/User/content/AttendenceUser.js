import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data } from "../../../redux/AttendenceSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Apis from "../../../Apis"
const Attendence = () => {
  const [attendence, setAttendence] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.LoginToken);

  useEffect(() => {
    const view = async () => {
      try {
        const res = await axios.get(Apis.USER_VIEW, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          dispatch(data(res.data.list));
          setAttendence(res.data.list);
        }
      } catch (err) {
        console.error(err);
      }
    };
    view();
  }, [dispatch, token]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Present":
        return <span className="badge rounded-pill bg-success px-3 py-2">Present</span>;
      case "Late":
        return <span className="badge rounded-pill bg-warning text-dark px-3 py-2">Late</span>;
      case "Absent":
        return <span className="badge rounded-pill bg-danger px-3 py-2">Absent</span>;
      default:
        return <span className="badge rounded-pill bg-secondary px-3 py-2">Unknown</span>;
    }
  };

  return (
    <div style={{
      marginLeft: "250px",
      minHeight: "100vh",
        background: "linear-gradient(to right,rgb(186, 222, 233),rgb(140, 155, 191))",
      padding: "50px 25px"
    }}>
      <div className="container">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top-4">
            <h4 className="mb-0 fw-bold">📅 Attendance Records</h4>
            <i className="bi bi-calendar-check-fill fs-3"></i>
          </div>
          <div className="card-body p-4">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center shadow-sm rounded">
                <thead className="table-info text-dark fs-6">
                  <tr>
                    <th>Date</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Check-In Time</th>
                  </tr>
                </thead>
                <tbody>
                  {attendence.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-muted py-4">No attendance records available.</td>
                    </tr>
                  ) : (
                    attendence.map((item) => (
                      <tr key={item._id}>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td className="text-primary fw-semibold">{item.attendance.email}</td>
                        <td>{getStatusBadge(item.attendance.status)}</td>
                        <td>
                          {item.attendance.checkInTime ? (
                            <span className="fw-medium">{item.attendance.checkInTime}</span>
                          ) : (
                            <span className="text-muted fst-italic">Not Checked In</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendence;
