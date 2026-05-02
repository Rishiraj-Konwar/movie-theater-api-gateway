import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express"
import { assignJwt, validateToken } from "../../middlewares";

const userProxy = createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {"^/api": ""}
})

export const userRouter = express.Router()

userRouter.use("/", assignJwt, validateToken, userProxy)