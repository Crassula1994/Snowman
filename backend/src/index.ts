import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.route";
import session from "express-session";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const EXPRESS_SESSION_SECRET_KEY = process.env.EXPRESS_SESSION_SECRET_KEY!;
const EXPRESS_SESSION_MAX_AGE = Number(process.env.EXPRESS_SESSION_MAX_AGE);
const NODE_ENV = process.env.NODE_ENV;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: true,
        methods: ["GET", "POST"],
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

// Basic route
app.get("/", (req: Request, res: Response) => {
    console.log(req.session);
    try {
        return res.status(200).json({
            message: "Welcome to Snowman API",
        });
    } catch (error) {
        return res.status(500).json({
            message: "내부 서버 에러",
        });
    }
});

// User routes
app.use("/api/user", userRouter);

// Unknown route handler
app.use((req: Request, res: Response) => {
    return res.status(404).json({
        message: "해당 경로를 찾을 수 없습니다.",
    });
});

// Start the server
app.listen(PORT, async () => {
    console.log(`서버가 http://localhost:${PORT}에서 작동 중입니다.`);
});
