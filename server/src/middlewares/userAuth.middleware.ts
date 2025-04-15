import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        message: "Unauthorized. No token provided",
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string;
      email: string;
    };

    const user = await User.findById(decoded._id);
    if (!user) {
      res.status(401).json({
        message: "Unauthorized. User not found",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
    return;
  }
};
