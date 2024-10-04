import { Router } from "express";
import {
    registerUser,
    signInUser,
    signOutUser,
    getUserInfo,
} from "../controller/user.controller";

const userRouter = Router();

// Register a new user
userRouter.post("/register", registerUser);

// Login a user
userRouter.post("/login", signInUser);

// Logout a user
userRouter.post("/logout", signOutUser);

// User Login check
userRouter.get("/user-info", getUserInfo);

export default userRouter;
