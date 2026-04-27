import express from "express";
import { authRouter } from "./v1/auth-routes";

export const router = express.Router();

router.use("/auth", authRouter);
