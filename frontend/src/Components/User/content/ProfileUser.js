import axios from "axios";
import { useEffect, useState } from "react";
import Apis from "../../../Apis";
import { useSelector } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";

const ProfileUser = () => {
  const [profile, setProfile] = useState("");
  const { token } = useSelector((store) => store.LoginToken);

  useEffect(() => {
    const detail = async () => {
      try {
        let res = await axios.get(Apis.USER_PROFILE, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 200) {
          setProfile(res.data.details);
        }
      } catch (err) {
        console.log(err);
      }
    };
    detail();
  }, [token]);

  return (
    <div
      className="mainContent"
      style={{
        marginLeft: "240px",
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "60px 15px"
      }}
    >
      <div
        className="card border-0 shadow-lg mx-auto"
        style={{
          maxWidth: 700,
          borderRadius: 20,
          background: "rgba(232, 250, 246, 0.7)",
          backdropFilter: "blur(10px)",
          padding: "40px"
        }}
      >
        <div className="text-center mb-4">
          <i className="bi bi-person-circle" style={{ fontSize: "3rem", color: "#4A148C" }}></i>
          <h2 className="fw-bold mt-2" style={{ color: "#4A148C" }}>Your Profile</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-3 border rounded shadow-sm bg-light">
              <strong className="text-muted">👤 Name</strong>
              <p className="mb-0 fw-semibold text-dark">{profile.name}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 border rounded shadow-sm bg-light">
              <strong className="text-muted">📧 Email</strong>
              <p className="mb-0 fw-semibold text-dark">{profile.email}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 border rounded shadow-sm bg-light">
              <strong className="text-muted">🎓 Batch</strong>
              <p className="mb-0 fw-semibold text-dark">{profile.batch}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
