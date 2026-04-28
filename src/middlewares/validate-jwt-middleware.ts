import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { jwtVerify, createRemoteJWKSet } from "jose";
import type { JWTPayload } from "jose";

interface PayloadObject extends JWTPayload {
  email: string;
  role: string;
}

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.USER_SERVICE_URL}/api/auth/jwks`),
);

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenHeader = req.header("Authorization");
    const jwt = tokenHeader?.split(" ")[1];
    if (!jwt) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized. Please login" });
      return;
    }
    const { payload } = await jwtVerify<PayloadObject>(jwt, JWKS, {
      issuer: process.env.USER_SERVICE_URL,
      audience: `http://localhost:${process.env.PORT}`,
    });
    req.headers["x-user-id"] = payload.sub;
    req.headers["x-user-email"] = payload.email;
    req.headers["x-user-role"] = payload.role;

    next();
  } catch (err) {
    console.log("An error occured: ", err);
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
  }
};
