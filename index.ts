import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { router } from "./src/routes";
import { authMiddleware } from "./src/middlewares/auth-middleware";

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

app.get("/auth-test", authMiddleware, (req, res) => {
  res.send("Better auth working");
});

app.listen(port, () => {
  console.log(`api gateway running at http://localhost:${port}`);
});
