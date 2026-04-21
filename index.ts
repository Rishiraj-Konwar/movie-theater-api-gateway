import express from 'express'
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json())

app.get("/", (req, res) => {
  res.json({msg: "Welcome to movie theater app"})
})

app.listen(port, () => {
  console.log(`api gateway running at http://localhost:${port}`)
})