import { Router } from "express";
import { register, login, signToken } from "../controller/user.controller";

const userRouter = Router();

// Register a new user
userRouter.post("/register", register);

// Login a user
userRouter.post("/login", login);

// Generate Session Token
userRouter.post("/sign-token", signToken);

export default userRouter;
