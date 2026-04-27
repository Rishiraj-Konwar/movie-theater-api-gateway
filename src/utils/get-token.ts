import axios from "axios"
import { redisClient } from './redis';

export const getToken = async (token: string) => {
  const response = await axios.get(`${process.env.USER_SERVICE_URL}/api/auth/token`, {
    headers:{
      Cookie: `better-auth.session_token=${token}`
    }
  })
  console.log(token, response)
  const key = `auth:jwtToken:${token}`
  redisClient.setEx(key, 1800, response.data.token) 
  return response.data.token
}