import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Box
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Apis from "../../../Apis";

const StickyHeadTable = () => {
  const [name, setName] = useState("");
  const [rows, setRows] = useState([]);
  const [date, setDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const { token } = useSelector((store) => store.LoginToken);
  const { batchList } = useSelector((store) => store.Batch);

  const attend = async () => {
    try {
      const res = await axios.get(`${Apis.ADMIN_USER_BATCH}/${date}/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setDate(res.data.attendance.date);
        setRows(res.data.attendance.attendance);
      }
    } catch (err) {
      alert("Data not found");
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMaxDate(today); 
    setDate(today);
  }, []);

  return (
    <Box
      sx={{
        padding: "2rem",
        background: "linear-gradient(to right, #e0f7fa, #b2ebf2)",
        minHeight: "100vh",
        marginLeft: "225px",
        transition: "margin 0.3s ease-in-out",
        width:"100%"
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#006064",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        📊 Attendance Management
      </Typography>

      <Paper
        elevation={6}
        sx={{
          padding: 4,
          marginTop: 4,
          marginBottom: 4,
          background: "linear-gradient(to right, #ffffff, #e1f5fe)",
          borderRadius: 3,
        }}
      >
        <Grid container spacing={17} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Select Batch"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              sx={{ backgroundColor: "white", borderRadius: 2,minWidth:"150px", }}
            >
              {batchList.map((batch) => (
                <MenuItem key={batch.name} value={batch.name}>
                  {batch.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              type="date"
              fullWidth
              label="Date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: maxDate }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              variant="outlined"
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              onClick={attend}
              variant="contained"
              fullWidth
              size="large"
              startIcon={<SearchIcon />}
              sx={{
                paddingY: 1.5,
                background: "linear-gradient(to right, #00bcd4, #0097a7)",
                borderRadius: 3,
                color: "white",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                '&:hover': {
                  background: "linear-gradient(to right, #0097a7, #00bcd4)",
                },
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {rows.length > 0 && (
        <TableContainer component={Paper} sx={{ background: "#e0f7fa", borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ background: "linear-gradient(to right, #00838f, #006064)" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((ele, idx) => (
                <TableRow
                  key={idx}
                  hover
                  sx={{
                    transition: "0.3s",
                    ":hover": {
                      backgroundColor: "#b2ebf2",
                    },
                  }}
                >
                  <TableCell>{ele.name}</TableCell>
                  <TableCell align="center">{ele.email}</TableCell>
                  <TableCell align="center">
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "999px",
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor:
                          ele.status === "Present"
                            ? "#43a047"
                            : ele.status === "Absent"
                            ? "#e53935"
                            : "#fb8c00",
                      }}
                    >
                      {ele.status}
                    </span>
                  </TableCell>
                  <TableCell align="center">{new Date(date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default StickyHeadTable;
