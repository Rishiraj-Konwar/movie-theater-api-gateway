import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import express from "express"
import { assignJwt, validateToken } from "../../middlewares";

const userProxy = createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => `/users${path}`,
  on: {
    proxyReq: fixRequestBody
  }
})

export const userRouter = express.Router()

userRouter.get("/id", assignJwt, validateToken, userProxy)
userRouter.get("/email", assignJwt, validateToken, userProxy)
userRouter.patch("/", assignJwt, validateToken, userProxy)
userRouter.delete("/", assignJwt, validateToken, userProxy)