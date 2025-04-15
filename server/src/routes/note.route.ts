import express from "express";
import { isAuthenticated } from "../middlewares/userAuth.middleware";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/notes.controller";

export const noteRoutes = express.Router();
noteRoutes.post("/add", isAuthenticated, addNote);
noteRoutes.get("/get", isAuthenticated, getNotes);
noteRoutes.put("/:id", isAuthenticated, updateNote);
noteRoutes.delete("/:id", isAuthenticated, deleteNote);
