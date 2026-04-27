import express from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";

export const authRouter = express.Router();
const authProxy = createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => `/api/auth${path}/email`,
});

authRouter.post("/sign-up", authProxy);

authRouter.post("/sign-in", authProxy);
