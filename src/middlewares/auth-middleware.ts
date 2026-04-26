import type {Request, Response, NextFunction} from "express"
import { redisClient } from "../utils"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const sessionToken = req.cookies["better-auth.session_token"]
  if(!sessionToken){
    res.
  }
}