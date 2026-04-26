import type {Request, Response, NextFunction} from "express"
import { StatusCodes } from "http-status-codes"
import { redisClient } from "../utils"
import { getToken } from "../utils"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const sessionToken = req.cookies["better-auth.session_token"]
  if(!sessionToken){
    res.status(StatusCodes.UNAUTHORIZED).json({"msg": "You are unauthorized. Please login"})
    return
  }
  const redisKey = `auth:jwtToken:${sessionToken}`
  try{
    let jwt = await redisClient.get(redisKey)
    if (!jwt){
      jwt = await getToken(sessionToken) 
    }
    req.headers['authorization'] = `Bearer ${jwt}`
    next()
  }catch(err){
    console.log("An error occured", err)
    throw err
  }
}