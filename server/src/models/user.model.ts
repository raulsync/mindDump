import mongoose from "mongoose";
import jwt from "jsonwebtoken";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  getJwt(): string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minLength: 4,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
});

userSchema.methods.getJwt = function (): string {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};

export const User = mongoose.model("User", userSchema);
