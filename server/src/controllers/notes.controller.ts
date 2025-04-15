import { Request, Response } from "express";
import { Notes } from "../models/notes.model";

export const addNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  console.log(req.body);

  try {
    const note = new Notes({ userId: req.user._id, title, content });
    console.log(note);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: "Error adding note" });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Notes.find({ userId: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notes" });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const note = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: "Error updating note" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    await Notes.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error deleting note" });
  }
};
