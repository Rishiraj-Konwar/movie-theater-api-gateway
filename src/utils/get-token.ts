import axios from "axios"
interface jwtResponse {
  token: string
}
export const getToken = async (token: string) => {
  const data:jwtResponse = await axios.get(`${process.env.BETTER_AUTH_URL}/api/auth/token`, {
    headers:{
      "Authorization": `Bearer ${token}`
    }
  })
  return data.token
}