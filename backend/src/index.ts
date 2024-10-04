import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";
import session from "express-session";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT);
const EXPRESS_SESSION_SECRET_KEY = process.env.EXPRESS_SESSION_SECRET_KEY!;
const EXPRESS_SESSION_MAX_AGE = Number(process.env.EXPRESS_SESSION_MAX_AGE);
const NODE_ENV = process.env.NODE_ENV;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
); // Enable CORS for all requests
app.use(morgan("dev")); // Log all requests to the console
app.use(
    session({
        cookie: {
            domain: "localhost",
            httpOnly: true,
            maxAge: EXPRESS_SESSION_MAX_AGE,
            secure: NODE_ENV == "production",
        },
        resave: false,
        saveUninitialized: true,
        secret: EXPRESS_SESSION_SECRET_KEY,
    })
);

// Handle Basic Route
app.get("/", (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: "Welcome to Snowman API",
        });
    } catch (error) {
        res.status(500).json({
            message: "내부 서버 에러",
        });
    }
});

// Use Router for User API
app.use("/api/user", userRouter);

// Handle Unknown Route
app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: "해당 경로를 찾을 수 없습니다.",
    });
});

// Start API Server
app.listen(PORT, "0.0.0.0", async () => {
    console.log(`서버가 http://localhost:${PORT}에서 작동 중입니다.`);
});
