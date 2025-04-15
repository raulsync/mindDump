import express from "express";
import { connectDb } from "./config/db";
import dotenv from "dotenv";

dotenv.config();
import cors from "cors";

import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.route";
import { noteRoutes } from "./routes/note.route";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/user", authRoutes);
app.use("/api/note", noteRoutes);
const PORT = process.env.PORT;

connectDb().then(() => {
  console.log("Database connection successful");
  app.listen(PORT, () => {
    console.log(`server is listening on Port ${PORT}`);
  });
});
