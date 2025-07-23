import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Grid
} from "@mui/material";
import axios from "axios";
import Apis from "../../Apis";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const {token} = useSelector((store)=>store.LoginToken);
  const navigate = useNavigate('')

  const handleSubmit = async(e) => {
    e.preventDefault();
     try{
       let res = await axios.post(Apis.ADMIN_VERIFY,{email,otp},{headers:{Authorization:`Bearer ${token}`}});
       if(res.status===200){
        alert("success");
        navigate("/Sign-in");
       }
     }
     catch(err){
       console.log(err)
     }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #c9d6ff, #e2e2e2)",
        px: 2
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          borderRadius: 4,
          maxWidth: 400,
          width: "100%",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)"
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight={700}
          mb={3}
          sx={{
            background: "linear-gradient(to right, #1565c0, #42a5f5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Verify OTP
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="6-digit OTP"
            inputProps={{ maxLength: 6 }}
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              background: "linear-gradient(to right, #0069c0, #00bcd4)",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              py: 1.3,
              borderRadius: 3,
              '&:hover': {
                background: "linear-gradient(to right, #00bcd4, #0069c0)"
              }
            }}
          >
            Verify
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default VerifyOtp;
