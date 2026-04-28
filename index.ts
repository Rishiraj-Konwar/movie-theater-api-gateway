import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { router } from "./src/routes";
import { assignJwt, validateToken } from "./src/middlewares";

dotenv.config();

const app = express();
const port = process.env.PORT;

//app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to movie theater app" });
});

//routes
app.use("/api", router);

app.get("/auth-test", assignJwt, validateToken,  (req, res) => {
  console.log(req.headers)
  res.send("Better auth working");
  return
});

app.listen(port, () => {
  console.log(`api gateway running at http://localhost:${port}`);
});
