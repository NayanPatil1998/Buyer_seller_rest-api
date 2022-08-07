import express from "express";
import { login, register } from "../controllers/user.controller";
// import { checkIfAuthenticated } from "../middlewares/userMiddleware";

const usersRouter = express.Router();

// usersRouter.get("/users", allUser);

usersRouter.post("/auth/register", register);
usersRouter.post("/auth/login", login);

export default usersRouter;