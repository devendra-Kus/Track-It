import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Apis from "../../../Apis";
import Header from "../../Admin.js/Header";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Chip,
  Stack,
  Divider,
  Avatar,
  Fade,
  Tooltip,
} from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const HolidayU = () => {
  const { token } = useSelector((store) => store.LoginToken);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(Apis.USER_HOLI, {
          headers: { Authorization: `bearer ${token}` },
        });
        setList(data.holidays ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <Box
      sx={{
        ml: { md: "240px" },
        minHeight: "100vh",
        background: "linear-gradient(to right,rgb(186, 222, 233),rgb(140, 155, 191))",
        p: { xs: 3, md: 6 },
      }}
    >
      <Header heading="🎉 Holiday Calendar" />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : list.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 8 }}>
          No holidays found.
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {list.map((ele) => (
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
      )}
    </Box>
  );
};

export default HolidayU;
