import express from "express";
import { connectDb } from "./config/db";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

connectDb().then(() => {
  console.log("Database connection successful");
  app.listen(PORT, () => {
    console.log(`server is listening on Port ${PORT}`);
  });
});
