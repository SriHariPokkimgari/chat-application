import express from "express";
import dotenv from "dotenv";
import connectDB from "./models/db.js";
import cors from "cors";
import router from "./routes/authentication.js";
import cookieParser from "cookie-parser";
import "./config/passport.js";
import passport from "passport";
import session from "express-session";
import { createServer } from "http";
import InitializeSocket from "./config/socket.js";

dotenv.config();

const app = express();
export const httpServer = createServer(app);
InitializeSocket(httpServer);
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", router);

connectDB();
httpServer.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
