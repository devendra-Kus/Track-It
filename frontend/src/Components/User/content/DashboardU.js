
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import { AccessTime, CheckCircle, Cancel } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import Apis from "../../../Apis";
import { useSelector } from "react-redux";

const DashboardU = () => {
 const {token} = useSelector((store)=>store.LoginToken);
 const defaultCount = {Present: 0,Late :0,Absent :0 }
 const [countAll,setCount ]= useState(defaultCount);

  useEffect(()=>{
    const count =async ()=>{
       try{
         let res = await axios.get(Apis.USER_COUNT,{headers:{Authorization:`Bearer ${token}`}})
         
const next = { ...defaultCount };         
        res.data.message.forEach(({ status, count }) => {
          next[status] = count;              
        });
        setCount(next); 

    }
    catch(err){
      console.log(err)
    }
    }

    count();
   
  },[])


  const stats = [
    {
      label: "Present",
      value: countAll.Present,
      bg: "linear-gradient(135deg,rgb(181, 209, 237), #e8f5e9)",
      icon: <CheckCircle sx={{ fontSize: 55, color: "#2e7d32" }} />,
      color: "#2e7d32",
    },
    {
      label: "Late",
      value: countAll.Late,
      bg: "linear-gradient(135deg, #fff3e0, #fff8e1)",
      icon: <AccessTime sx={{ fontSize: 55, color: "#ef6c00" }} />,
      color: "#ef6c00",
    },
    {
      label: "Absent",
      value: countAll.Absent,
      bg: "linear-gradient(135deg, #ffebee, #fce4ec)",
      icon: <Cancel sx={{ fontSize: 55, color: "#c62828" }} />,
      color: "#c62828",
    },
  ];

  return (
    <Box
      className="mainContent"
      sx={{
        minHeight: "100vh",
        py: 6,
        px: 3,
        background: "linear-gradient(to top right, #e3f2fd, #fff3e0)",
      }}
    >
      {/* Heading */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" fontWeight={800} color="#0d47a1">
          📊 Attendance Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Track your monthly performance at a glance.
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={4} justifyContent="center">
        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 4,
                background: item.bg,
                transition: "0.4s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              {item.icon}
              <Typography variant="h6" fontWeight={600} mt={1}>
                {item.label}
              </Typography>
              <Typography
                variant="h3"
                fontWeight={800}
                sx={{ color: item.color }}
              >
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 6 }} />

      {/* Bottom Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 4,
               background: "linear-gradient(135deg, #e3f2fd, #e1f5fe)",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              color="#558b2f"
              gutterBottom
            >
              🧠 Productivity Tip
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Consistency matters more than intensity. Try showing up on time every day even if it's a small step forward!
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 4,
     background: "linear-gradient(135deg, #e3f2fd, #e1f5fe)",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              color="#1565c0"
              gutterBottom
            >
              📌 Recent Activity
            </Typography>
            <Box component="ul" sx={{ pl: 2, color: "#444", mt: 2 }}>
              <li>Marked present on 18th June</li>
              <li>Leave requested from 20–22 June</li>
              <li>Late on 17th June</li>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardU;
