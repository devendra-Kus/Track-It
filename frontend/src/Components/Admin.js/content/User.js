import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Box,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Apis from "../../../Apis";

const User = () => {
  const [batch, setBatch] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);

  const { token } = useSelector((store) => store.LoginToken);
  const { batchList } = useSelector((store) => store.Batch);

  const fetchUser = async () => {
    if (!batch) {
      setError(true);
      return;
    }

    try {
      const res = await axios.get(`${Apis.ADMIN_USERS}/${batch}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setRows(res.data.message || []);
      }
    } catch (err) {
      alert("User not found");
    }
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        background: "linear-gradient(to right, #e0f7fa, #b2ebf2)",
        minHeight: "100vh",
        marginLeft: "225px",
        transition: "margin 0.3s ease-in-out",
        width: "100%",
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
        🔍 Search User by Batch
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
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Select Batch"
              fullWidth
              value={batch}
              onChange={(e) => {
                setBatch(e.target.value);
                setError(false);
              }}
              onBlur={() => {
                if (!batch) setError(true);
              }}
              error={error}
              helperText={error ? "Batch selection is required" : ""}
              variant="outlined"
              sx={{ backgroundColor: "white", borderRadius: 2,minWidth:"300px" }}
            >
              {batchList.map((b) => (
                <MenuItem key={b.name} value={b.name}>
                  {b.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              onClick={fetchUser}
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

      {Array.isArray(rows) && rows.length > 0 && (
        <TableContainer component={Paper} sx={{ background: "#e0f7fa", borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ background: "linear-gradient(to right, #00838f, #006064)" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default User;
