import express from "express";
import { connectDb } from "./config/db";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.route";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", authRoutes);
const PORT = process.env.PORT;

connectDb().then(() => {
  console.log("Database connection successful");
  app.listen(PORT, () => {
    console.log(`server is listening on Port ${PORT}`);
  });
});
