
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, CardContent, CardHeader, Divider, Avatar, Grid } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import Apis from "../../../Apis";
import Header from "../Header";

const Leave = () => {
  const { token } = useSelector((store) => store.LoginToken);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const { data, status } = await axios.get(Apis.ADMIN_LEAVES, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (status === 200) setList(data.message);
      } catch (error) {
        console.error(error);
      }
    };
    if (token) fetchLeaves();
  }, [token]);

  const handleAction = async (id, action) => {
    const status = action === "accept" ? "Approved" : "Rejected";
    try {
      await axios.put(
        `${Apis.ADMIN_LEAVESTATUS}/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setList((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
    } catch (err) {
      console.error(err);
    }
  };

  const statusColor = (s) =>
    s === "Pending" ? "#FBC02D" : s === "Approved" ? "#4CAF50" : "#E53935";

  return (
    <Box sx={{ pl: "260px", py: 4, background: "linear-gradient(to right, #e3f2fd, #e1f5fe)",minWidth:"100vw", minHeight: "100vh" }}>
      <Header heading="📋 Leave Requests" />

      <Box sx={{ mt: 4 }}>
        {list.length ? (
          <Grid container spacing={4}>
            {list.map((l) => (
              <Grid item xs={12} sm={6} md={3} key={l._id}>
                <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%", p: 1, backgroundColor: "#ffffff" }}>
                  <CardHeader
                    avatar={<Avatar>{l.name?.charAt(0).toUpperCase()}</Avatar>}
                    title={<Typography variant="h6" fontWeight={600}>{l.name}</Typography>}
                    subheader={<Typography variant="body2" color="text.secondary">{l.email}</Typography>}
                    sx={{ backgroundColor: "#e3f2fd", borderRadius: 2, mb: 1 }}
                  />
                  <Divider />
                  <CardContent sx={{ pt: 2 }}>
                    <Typography variant="body2" gutterBottom><strong>Batch:</strong> {l.batchName}</Typography>
                    <Typography variant="body2" gutterBottom><strong>Type:</strong> {l.type}</Typography>
                    <Typography variant="body2" gutterBottom><strong>Reason:</strong> {l.reason}</Typography>
                    <Typography variant="body2" gutterBottom><strong>From:</strong> {new Date(l.from).toLocaleDateString()}</Typography>
                    <Typography variant="body2" gutterBottom><strong>To:</strong> {new Date(l.to).toLocaleDateString()}</Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Status:</strong>{" "}
                      <Box
                        component="span"
                        sx={{
                          bgcolor: statusColor(l.status),
                          color: "#fff",
                          px: 2,
                          py: 0.4,
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 600,
                          ml: 1,
                          display: "inline-block"
                        }}
                      >
                        {l.status}
                      </Box>
                    </Typography>
                    {l.status === "Pending" && (
                      <Box sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "center" }}>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ backgroundColor: "#e3f2f", '&:hover': { backgroundColor: "#66bb6a" }, flex: 1, fontSize: 12, fontWeight: 500 }}
                          onClick={() => handleAction(l._id, "accept")}
                        >
                          Accept
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ backgroundColor: "#56DFCF", '&:hover': { backgroundColor: "#e57373" }, flex: 1, fontSize: 12, fontWeight: 500 }}
                          onClick={() => handleAction(l._id, "reject")}
                        >
                          Reject
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography align="center" variant="h6" color="text.secondary">
            No leave requests found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Leave;
