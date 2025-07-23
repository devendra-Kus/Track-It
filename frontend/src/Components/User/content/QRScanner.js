import React, { useEffect, useState } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useSelector } from "react-redux";
import Apis from "../../../Apis";
import './QRScanner.css'; // ✅ Corrected: matches the real file name

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  Alert,
  useTheme,
  Slide,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlaceIcon from "@mui/icons-material/Place";

const QRScanner = () => {
  const { token } = useSelector((s) => s.LoginToken);
  const [qrData, setQrData] = useState(null);
  const [scanDone, setScanDone] = useState(false);
  const [status, setStatus] = useState("");
  const [loc, setLoc] = useState({ lon: "", lat: "" });


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLoc({ lon: pos.coords.longitude, lat: pos.coords.latitude }),
      (err) => console.error(err)
    );
  }, []);

  const markAttendance = async () => {
    try {
      const res = await axios.post(
        Apis.USER_MARK,
        { status, Date: new Date().toISOString().split("T")[0] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        alert("✅ Attendance Marked Successfully!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const validateDistance = () => {
    if (!qrData) return;
    const R = 6371000;
    const toRad = (v) => (v * Math.PI) / 180;

    const dLat = toRad(loc.lat - qrData.locationLat);
    const dLon = toRad(loc.lon - qrData.locationLon);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(qrData.locationLat)) *
        Math.cos(toRad(loc.lat)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;

    if (dist <= 50) {
      markAttendance();
    } else {
      alert("❌ Out of range! Please scan from valid location.");
    }
  };

  const startScan = () => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 25, qrbox: 250 });
    scanner.render(
      (decodedText) => {
        try {
          const payload = JSON.parse(decodedText);
          setQrData(payload);

          const now = new Date();
          const [h, m] = payload.time.split(":").map(Number);
          const late =
            now.getHours() > h ||
            (now.getHours() === h && now.getMinutes() > m);
          setStatus(late ? "Late" : "Present");

          setScanDone(true);
        } catch (e) {
          console.error("Invalid QR:", e);
        }
        scanner.clear();
      },
      (err) => console.error(err)
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        ml: { md: "240px" },
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581090700227-1e8e1f9b9c3d?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Slide in direction="up" timeout={500}>
        <Card
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 500,
            p: 3,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <CardContent>
            <Stack spacing={3} alignItems="center">
              <Typography variant="h6" fontWeight={600} color="primary">
                Scan QR to Mark Attendance
              </Typography>

              <Box
                id="reader"
                sx={{
                  width: 300,
                  height: 300,
                  border: "2px dashed #aaa",
                  borderRadius: 2,
                  bgcolor: "white",
                  p: 1,
                }}
              />

              <Button
                variant="outlined"
                fullWidth
                startIcon={<CameraAltIcon />}
                onClick={startScan}
                disabled={scanDone}
              >
                {scanDone ? "Scanned" : "Start Scanning"}
              </Button>

              <Button
                variant="contained"
                fullWidth
                startIcon={<CheckCircleIcon />}
                onClick={validateDistance}
                disabled={!scanDone}
                sx={{
                  backgroundColor: "#2e7d32",
                  '&:hover': {
                    backgroundColor: "#1b5e20",
                  },
                }}
              >
                Validate & Mark
              </Button>

              {qrData && (
                <Alert
                  severity="info"
                  sx={{ width: "100%", borderRadius: 2 }}
                  iconMapping={{ info: <PlaceIcon /> }}
                >
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      Your Location: <strong>{loc.lat.toFixed(4)}, {loc.lon.toFixed(4)}</strong>
                    </Typography>
                    <Typography variant="body2">
                      QR Location: <strong>{qrData.locationLat}, {qrData.locationLon}</strong>
                    </Typography>
                    <Chip
                      label={status}
                      color={status === "Present" ? "success" : "warning"}
                      icon={<CheckCircleIcon />}
                      sx={{ alignSelf: "flex-start" }}
                    />
                  </Stack>
                </Alert>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Slide>
    </Box>
  );
};

export default QRScanner;