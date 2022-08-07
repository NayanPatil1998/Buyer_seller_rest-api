import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import { COOKIE_NAME, __prod__ } from "./constants";
import initdb from "./db/conn";
import { IUser } from "./Schemas/User";
import usersRouter from "./routes/user.route";
import cookieParser from "cookie-parser"
import SellerRoute from "./routes/seller.route";
import BuyerRoute from "./routes/buyer.route";

dotenv.config();
declare module 'express-session' {
  export interface SessionData {
    user: IUser;
  }
}


const app = express();
app.use(morgan("dev"));
app.use(express.json())

app.use(
  session({
    name: COOKIE_NAME,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      sameSite: "none", //CSRF
      secure: __prod__,
      path:'/',
      domain: 'localhost'
    },
    
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,

  })
);
// Routes
app.use("/api", usersRouter);
app.use("/api", SellerRoute);
app.use("/api", BuyerRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.use(cookieParser())

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.set("trust proxy", 1);
initdb();


app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
