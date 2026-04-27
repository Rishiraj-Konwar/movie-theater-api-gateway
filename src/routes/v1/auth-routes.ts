import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const authRouter = express.Router();

authRouter.post(
  "/sign-up",
  createProxyMiddleware({
    target: process.env.BETTER_AUTH_URL,
    changeOrigin: true,
  }),
);

authRouter.post(
  "/sign-in",
  createProxyMiddleware({
    target: process.env.BETTER_AUTH_URL,
    changeOrigin: true,
  }),
);
