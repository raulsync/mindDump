import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "user already exists",
      });
    }
    //hash the password

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = await newUser.getJwt();

    return res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .json({
        data: newUser,
        message: "User data saved successfully",
      });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const token = await user.getJwt();
    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .json({
        data: user,
        message: "Login Successfully",
      });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  }
};
