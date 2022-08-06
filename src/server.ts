import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import { COOKIE_NAME, __prod__ } from "./constants";
import initdb from "./db/conn";

dotenv.config();

const app = express();
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.set("trust proxy", 1);
initdb();

app.use(
  session({
    name: COOKIE_NAME,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      sameSite: "none", //CSRF
      secure: __prod__,
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
  })
);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
