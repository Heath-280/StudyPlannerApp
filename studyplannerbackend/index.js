import express from "express";
import cors from "cors";
import ConnectDB from "./config/db.js";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import studyRoutes from "./routes/studyRoutes.js"

dotenv.config();

ConnectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/study",studyRoutes);

app.get("/",(req,res) => {
    res.send("backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT ,() =>{
    console.log(`Server is running on port ${PORT}`);
});

