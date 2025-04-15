import express, { RequestHandler } from "express";
import { login, signUp, updateProfile } from "../controllers/user.controller";
import { loginBody, signupBody } from "../types";
import { isAuthenticated } from "../middlewares/userAuth.middleware";

export const authRoutes = express.Router();

authRoutes.post(
  "/signup",
  signUp as unknown as RequestHandler<{}, {}, signupBody>
);
authRoutes.post(
  "/login",
  login as unknown as RequestHandler<{}, {}, loginBody>
);
authRoutes.put("/update/profile", isAuthenticated, updateProfile);
