import express, { RequestHandler } from "express";
import { login, signUp } from "../controllers/user.controller";
import { loginBody, signupBody } from "../types";

export const authRoutes = express.Router();

authRoutes.post("/signup", signUp as RequestHandler<{}, {}, signupBody>);

authRoutes.post("/login", login as RequestHandler<{}, {}, loginBody>);
