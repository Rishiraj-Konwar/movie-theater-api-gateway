import axios from "axios"
import { redisClient } from './redis';
interface jwtResponse {
  token: string
}
export const getToken = async (token: string) => {
  const data: jwtResponse= await axios.get(`${process.env.BETTER_AUTH_URL}/api/auth/token`, {
    headers:{
      "Authorization": `Bearer ${token}`
    }
  })
  const key = `auth:jwtToken:${token}`
  redisClient.setEx(key, 1800, data.token) 
  return data.token
}