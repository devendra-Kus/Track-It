    import express from "express";
    import bodyParser from "body-parser";
    import dotenv from "dotenv";
    import "./db/dbConfi.js";
    import AdminRoute from "./routes/admin.routes.js";
    import userRouter from "./routes/user.route.js";
    import cors from "cors";
    import cookieParser from "cookie-parser";



    dotenv.config();


    const server = express();
    
    server.use(cookieParser(    ))
const allowedOrigins = [
  "https://trackit-frontend-b0ed.onrender.com/",
  "http://localhost:3000", 
];

server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended:true}));


    server.use("/admin",AdminRoute);
    server.use("/user",userRouter);
    server.get("/",(req,res)=>{
        console.log("backend live");
    })

    server.listen(process.env.PORT || 4000,"0.0.0.0",()=>{
        console.log("server started");
    })

