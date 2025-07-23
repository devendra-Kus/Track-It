import { useSelector } from "react-redux";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import Apis from "../../../Apis";
import { useState } from "react";

const LeaveU = () => {
  const { token } = useSelector((store) => store.LoginToken);

  const [formData, setFormData] = useState({
    reason: "",
    type: "Casual",
    from: "",
    to: "",
  });

  const [leave, setLeave] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showTable, setShowTable] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(Apis.USER_LEAVE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) setLeave(res.data.Leave);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(Apis.USER_LEAVE, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Leave request submitted successfully.");
      setFormData({ reason: "", type: "Casual", from: "", to: "" });
      fetchLeaves();
    } catch (err) {
      setMessage("❌ Error submitting leave request.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTable = () => {
    setShowTable((prev) => !prev);
    if (!showTable) fetchLeaves();
  };

  return (
    <div
      style={{
        marginLeft: "240px",
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #b2ebf2)",
        padding: "50px 15px",
      }}
    >
      <div
        className="card border-0 shadow-lg mx-auto mb-4"
        style={{
          maxWidth: 650,
          borderRadius: 18,
          background: "rgba(255, 255, 255, 0.70)",
          backdropFilter: "blur(10px)",
          padding: "30px",
        }}
      >
        <h4 className="text-center fw-bold mb-3" style={{ color: "#4E342E" }}>
          <i className="bi bi-calendar-plus me-2" />
          Leave Request Form
        </h4>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12">
            <label className="form-label fw-semibold" htmlFor="reason">
              Reason
            </label>
            <input
              type="text"
              id="reason"
              name="reason"
              className="form-control"
              placeholder="Enter reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold" htmlFor="type">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Casual">Casual</option>
              <option value="Sick">Sick</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold" htmlFor="from">
              From
            </label>
            <input
              type="date"
              id="from"
              name="from"
              className="form-control"
              value={formData.from}
              onChange={handleChange}
              min={today}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold" htmlFor="to">
              To
            </label>
            <input
              type="date"
              id="to"
              name="to"
              className="form-control"
              value={formData.to}
              onChange={handleChange}
              min={formData.from || today}
              required
            />
          </div>

          <div className="col-12 text-center mt-2">
            <button
              type="submit"
              className="btn btn-dark btn-sm px-4 py-1"
              style={{ fontSize: "14px", borderRadius: "20px" }}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" />
              ) : (
                "Submit Leave"
              )}
            </button>
          </div>

          {message && (
            <div className="col-12">
              <div className="alert alert-info text-center fw-semibold mb-0 mt-2">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>

 
      <div className=" text-center mb-3 " style={{maxWidth:"500px",marginLeft:"25%"} }>
        <button
          className="btn btn-outline-dark btn-sm"
          style={{
            fontSize: "13px",
            padding: "5px 20px",
            borderRadius: "20px",
            fontWeight: "600",

          }}
          onClick={handleToggleTable}
        >
          <i className="bi bi-list-ul me-2" />
          {showTable ? "Hide My Leaves" : "Show My Leaves"}
        </button>
      </div>

   
      {showTable && (
        <div
          style={{
            maxWidth: "900px",
            margin: "auto",
            background: "#ffffffcc",
            borderRadius: "18px",
            padding: "25px",
            boxShadow: "0 0 12px rgba(0,0,0,0.2)",
          }}
        >
          <h5 className="fw-bold text-center mb-3" style={{ color: "#3E2723" }}>
            <i className="bi bi-clipboard-data me-2" />
            My Leave History
          </h5>

          {leave.length > 0 ? (
            <div
              style={{
                overflowX: "auto",
                borderRadius: "12px",
                background: "#e0f7fa",
              }}
            >
              <table className="table text-center align-middle" style={{ minWidth: "600px" }}>
                <thead style={{ background: "linear-gradient(to right,#00838f,#006064)", color: "#fff" }}>
                  <tr>
                    <th>Reason</th>
                    <th>Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leave.map((l) => (
                    <tr
                      key={l._id}
                      style={{
                        backgroundColor: "#e0f7fa",
                        transition: "0.3s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b2ebf2")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e0f7fa")}
                    >
                      <td style={{ fontSize: "14px" }}>{l.reason}</td>
                      <td style={{ fontSize: "14px" }}>{l.type}</td>
                      <td style={{ fontSize: "14px" }}>{l.from.slice(0, 10)}</td>
                      <td style={{ fontSize: "14px" }}>{l.to.slice(0, 10)}</td>
                      <td>
                        <span
                          className="badge rounded-pill px-3 py-2"
                          style={{
                            fontSize: "13px",
                            backgroundColor:
                              l.status === "Approved"
                                ? "#4caf50"
                                : l.status === "Rejected"
                                ? "#e53935"
                                : "#ffb300",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center mt-3 fw-semibold">No leave record found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaveU;