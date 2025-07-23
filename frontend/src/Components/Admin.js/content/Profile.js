import { useEffect, useState } from "react";
import axios from "axios";
import Apis from "../../../Apis";
import { useSelector } from "react-redux";
import { Box, Paper, Avatar, Typography, Divider } from "@mui/material";

const Profile = () => {
  const { token } = useSelector((store) => store.LoginToken);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(Apis.ADMIN_PROFILE, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.profile);
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <Box
      className="mainContent"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #b2ebf2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "90%",
          maxWidth: 600,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          backgroundColor: "#ffffffdd",
        }}
      >
        <Typography variant="h4" fontWeight={700} color="#00796b" gutterBottom>
          Profile
        </Typography>

        <Avatar
          src="/images/adminpro.png"
          alt="Admin"
          sx={{
            width: 100,
            height: 100,
            margin: "0 auto",
            border: "3px solid #00acc1",
            mb: 3,
          }}
        />

        {profile ? (
          <>
            <Box textAlign="left" mt={2}>
              <Typography variant="subtitle1" color="text.secondary">
                Name
              </Typography>
              <Typography variant="h6" fontWeight={600} mb={2}>
                {profile.name}
              </Typography>

              <Divider />

              <Typography variant="subtitle1" color="text.secondary" mt={2}>
                Institute
              </Typography>
              <Typography variant="h6" fontWeight={600} mb={2}>
                {profile.institute}
              </Typography>

              <Divider />

              <Typography variant="subtitle1" color="text.secondary" mt={2}>
                Email
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {profile.email}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography variant="body1" mt={4}>
            Loading profile...
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
