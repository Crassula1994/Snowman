import { Request, Response } from "express";
import axios from "axios";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import moment from "moment-timezone";
import { pool } from "../config/connectDB";
import { signRefreshToken } from "../utils/jsonWebToken";

dotenv.config();

const API_URL = process.env.API_URL;
const API_ACCESS_TOKEN = process.env.API_ACCESS_TOKEN;

// register a new user
export const register = async (req: Request, res: Response) => {
    try {
        console.log(API_URL);

        // get the user data from the request body
        const { username, email, password } = req.body;

        // check if user data is provided
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide all user details",
            });
        }

        // check if user already exists
        // const existingUsers = await axios.get(`${API_URL}`);
        // if (user.rows.length > 0) {
        //     return res.status(400).json({
        //         message: "User with this email already exists",
        //     });
        // }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            options: {
                bpname: "SignUp (Geun)",
            },
            data: [
                {
                    cegCreatedAt: moment().utc().format("MM-DD-YYYY HH:mm:ss"),
                    cegUserName: username,
                    cegPassword: hashedPassword,
                    cegEmail: email,
                    cegRefreshToken: signRefreshToken(),
                },
            ],
        };

        await axios.post(`${API_URL}/record`, userData, {
            headers: {
                Authorization: `Bearer ${API_ACCESS_TOKEN}`,
            },
        });

        return res.status(200).json({
            message: "User registered successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// login a user
export const login = async (req: Request, res: Response) => {
    try {
        // get the user data from the request body
        const { email, password } = req.body;

        // check if user data is provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all user details",
            });
        }

        // check if user exists
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);

        if (user.rows.length === 0) {
            return res.status(400).json({
                message: "User does not exist",
            });
        }

        // compare the password
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        // If the email and password are valid, return user data
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user.rows[0].id,
                username: user.rows[0].username,
                email: user.rows[0].email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
