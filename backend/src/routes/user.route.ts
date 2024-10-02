import { Router } from "express";
import {
    register,
    login,
    logout,
    checkUser,
} from "../controller/user.controller";

const userRouter = Router();

// Register a new user
userRouter.post("/register", register);

// Login a user
userRouter.post("/login", login);

// Logout a user
userRouter.post("/logout", logout);

// User Login check
userRouter.get("/check", checkUser);

export default userRouter;
