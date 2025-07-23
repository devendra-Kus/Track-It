import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Apis from "../../../Apis";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Typography,
  Paper,
  MenuItem,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
  Stack,
  Chip,
  Fade,
  Tooltip
} from "@mui/material";

import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import GroupIcon from "@mui/icons-material/Group";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const Holiday = () => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [batchName, setName] = useState('');
  const [description, setDescription] = useState('');
  const [holidayList, setHolidayList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { batchList } = useSelector((store) => store.Batch);
  const { token } = useSelector((store) => store.LoginToken);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(Apis.ADMIN_HOLIDAY, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setHolidayList(response.data.list);
      }
    } catch (err) {
      console.error("Error fetching holidays:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchHolidays();
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        Apis.ADMIN_HOLIDAY,
        { title, date, description, batchName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        alert("Holiday declared successfully");
        setTitle('');
        setDate('');
        setName('');
        setDescription('');
        fetchHolidays(); // Refresh list
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box className="mainContent" sx={{ minHeight: "100vh", background: "linear-gradient(to right, #e0f7fa, #b2ebf2)", py: 4 }}>
      <Box maxWidth="600px" mx="auto">
        <Paper elevation={8} sx={{ p: 4, borderRadius: 5, background: "linear-gradient(to right, #ffffff, #e3f2fd)" }}>
          <Typography variant="h4" fontWeight={700} color="primary" gutterBottom textAlign="center">
            📅 Declare Holiday
          </Typography>
          <form onSubmit={submit}>
            <TextField
              select
              fullWidth
              label="Select Batch"
              value={batchName}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3 }}
              required
            >
              <MenuItem value="">-- Choose Batch --</MenuItem>
              {batchList.map((batch, index) => (
                <MenuItem key={index} value={batch.name}>
                  {batch.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3 }}
              required
            />

            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 3 }}
              required
            />

            <TextField
              fullWidth
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              sx={{ mb: 3 }}
              required
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                py: 1.3,
                fontWeight: 700,
                fontSize: '1rem',
                background: 'linear-gradient(to right, #2e3ed1, #4a00e0)',
                color: 'white',
                borderRadius: '8px',
                '&:hover': {
                  background: 'linear-gradient(to right, #4a00e0, #8e2de2)',
                  boxShadow: '0 4px 20px rgba(138, 43, 226, 0.4)',
                },
              }}
            >
              Declare Holiday
            </Button>
          </form>
        </Paper>
      </Box>

      {/* Card Section */}
      <Box sx={{ mt: 6, px: 4 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
          🎊 Declared Holidays
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : holidayList.length ? (
          <Grid container spacing={4} justifyContent="center">
            {holidayList.map((ele) => (
              <Fade in={true} timeout={600} key={ele._id}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    elevation={12}
                    sx={{
                      borderRadius: 5,
                      background: "linear-gradient(to bottom right, #ffffff, #f8f9fa)",
                      p: 2,
                      transition: "0.3s",
                      '&:hover': {
                        transform: "scale(1.03)",
                        boxShadow: "0 12px 35px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <EmojiEventsIcon />
                        </Avatar>
                        <Typography variant="h6" fontWeight={700} color="primary">
                          {ele.title}
                        </Typography>
                      </Stack>

                      <Divider sx={{ mb: 2 }} />

                      <Tooltip title="Description" arrow>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                          <InfoIcon color="action" />
                          <Typography variant="body1" color="text.secondary">
                            {ele.description}
                          </Typography>
                        </Stack>
                      </Tooltip>

                      <Tooltip title="Batch Name" arrow>
                        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                          <GroupIcon color="primary" />
                          <Chip label={ele.batchName} color="primary" variant="outlined" />
                        </Stack>
                      </Tooltip>

                      <Tooltip title="Holiday Date" arrow>
                        <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                          <EventIcon color="success" />
                          <Chip
                            label={new Date(ele.date).toLocaleDateString("en-IN", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                            color="success"
                            variant="outlined"
                          />
                        </Stack>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </Grid>
              </Fade>
            ))}
          </Grid>
        ) : (
          <Typography align="center" color="text.secondary" mt={5}>
            No holidays declared yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Holiday;

