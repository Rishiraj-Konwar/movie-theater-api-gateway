import express from "express";
import { authRouter } from "./v1/auth-routes";
import { userRouter } from "./v1/user-routes";

export const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter)
