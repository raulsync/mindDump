import mongoose from "mongoose";
import { IUser } from "./models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: mongoose.Document<unknown, {}, IUser> & IUser;
    }
  }
}
