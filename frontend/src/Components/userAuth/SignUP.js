
import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import Apis from "../../Apis";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${Apis.ADMIN_SIGNUP}`, {
        name,
        institute,
        email,
        password,
      });

      if (response.status === 200) {
        navigate("/VerifyOtp");
      }
    } catch (err) {
      if (err?.response?.status === 409) {
        alert("User already exists");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #b2ebf2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 6,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 4,
          maxWidth: "900px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Left Image Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            background: "#e3f2fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 4,
          }}
        >
          <img
            src="/images/s.png"
            alt="Signup Visual"
            style={{
              width: "85%",
              maxHeight: "360px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Right Form Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            p: 4,
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
            sx={{
              background: "linear-gradient(to right, #0069c0, #00bcd4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Admin Sign Up
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              type="text"
              variant="outlined"
              margin="normal"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              fullWidth
              label="Institute Name"
              type="text"
              variant="outlined"
              margin="normal"
              required
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: 3,
                background: "linear-gradient(to right, #0069c0, #00bcd4)",
                color: "#fff",
                "&:hover": {
                  background: "linear-gradient(to right, #00bcd4, #0069c0)",
                  boxShadow: "0 4px 15px rgba(0,188,212,.4)",
                },
              }}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;

