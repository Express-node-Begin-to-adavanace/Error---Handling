import express from "express";
import { createUser, GetAllUsers } from "../application/User.js";

const usersRouter = express.Router();

usersRouter.post("/",createUser).get("/",GetAllUsers);

export default usersRouter;