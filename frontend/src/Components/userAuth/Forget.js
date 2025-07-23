
import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  InputAdornment,
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/VpnKey";
import axios from "axios";
import Apis from "../../Apis";          
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [step, setStep] = useState("email");          
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  // 1️⃣  send OTP
  const handleSend = async () => {
    setLoading(true);
    setMsg("");
    try {
      await axios.post(Apis.ADMIN_FORGOT, { email });
      setStep("verify");
      setMsg("OTP sent to your email.");
    } catch (e) {
      setMsg(e.response?.data?.message || "Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣  verify OTP & reset password
  const handleReset = async () => {
    if (password !== confirm) {
      setMsg("Passwords do not match.");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      await axios.post(Apis.ADMIN_RESET, { email, otp, password });
      setMsg("Password reset successful. Redirecting…");
      setTimeout(() => navigate("/"), 1500);
    } catch (e) {
      setMsg(e.response?.data?.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#f0f4ff,#e0f7fa)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 6,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 5,
          maxWidth: 800,
          width: "90%",
          overflow: "hidden",
        }}
      >
        {/* Left panel */}
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            background: "linear-gradient(to bottom right,#fce4ec,#e1f5fe)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <img
            src="/images/s.png"
            alt="QR Visual"
            style={{ width: "80%", maxHeight: 340, objectFit: "contain", marginBottom: 20 }}
          />
          <Typography variant="h5" fontWeight={700} textAlign="center">
            Smart Attendance Portal
          </Typography>
          <Typography textAlign="center" mt={1}>
            Secure • Reliable • Fast
          </Typography>
        </Box>

        {/* Right panel */}
        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            p: 4,
            background: "rgba(255,255,255,.98)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={800}
            textAlign="center"
            sx={{
              mb: 3,
              background: "linear-gradient(to right,#1565c0,#42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Forgot Password
          </Typography>
          {step === "email" && (
            <>
              <TextField
                fullWidth
                label="Registered Email"
                type="email"
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <EmailIcon />
                    </InputAdornment>
                  ),
                  sx: { pl: 1 },
                }}
              />

              <Button
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.3,
                  fontWeight: 700,
                  borderRadius: 3,
                  background: "linear-gradient(to right,#0077c2,#00bcd4)",
                  color: "#fff",
                  "&:hover": { background: "linear-gradient(to right,#00bcd4,#0077c2)" },
                }}
                onClick={handleSend}
              >
                Send OTP
              </Button>
            </>
          )}
          {step === "verify" && (
            <>
              <TextField
                fullWidth
                label="Email"
                disabled
                margin="normal"
                value={email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <EmailIcon />
                    </InputAdornment>
                  ),
                  sx: { pl: 1 },
                }}
              />

              <TextField
                fullWidth
                label="OTP"
                margin="normal"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <KeyIcon />
                    </InputAdornment>
                  ),
                  sx: { pl: 1 },
                }}
              />

              <TextField
                fullWidth
                label="New Password"
                type="password"
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <LockIcon />
                    </InputAdornment>
                  ),
                  sx: { pl: 1 },
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                margin="normal"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <LockIcon />
                    </InputAdornment>
                  ),
                  sx: { pl: 1 },
                }}
              />

              <Button
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.3,
                  fontWeight: 700,
                  borderRadius: 3,
                  background: "linear-gradient(to right,#0077c2,#00bcd4)",
                  color: "#fff",
                  "&:hover": { background: "linear-gradient(to right,#00bcd4,#0077c2)" },
                }}
                onClick={handleReset}
              >
                Reset Password
              </Button>
            </>
          )}

          {msg && (
            <Typography textAlign="center" mt={2} fontWeight={600}>
              {msg}
            </Typography>
          )}
        </Box>
      </Paper>

      <Backdrop sx={{ color: "#fff", zIndex: (t) => t.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default ForgetPassword;
