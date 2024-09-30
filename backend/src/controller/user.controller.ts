import { Request, Response } from "express";
import axios from "axios";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import moment from "moment-timezone";
import { signRefreshToken } from "../utils/jsonWebToken";

dotenv.config();

const API_URL = process.env.API_URL;
const API_ACCESS_TOKEN = process.env.API_ACCESS_TOKEN;

// register a new user
export const register = async (req: Request, res: Response) => {
    try {
        // get the user data from the request body
        const { username, email, password } = req.body;

        // check if user data is provided
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide all user details",
            });
        }

        const emailListFilter = {
            bpname: "SignUp (Geun)",
            lineitem: "no",
            filter_condition: "status=Active",
            filter_criteria: {
                filter: [
                    {
                        field: "cegEmail",
                        value: email,
                        condition_type: "eq",
                    },
                ],
            },
            record_fields: "cegEmail",
        };

        // check if user already exists
        const response = await axios.post(
            `${API_URL}/records`,
            emailListFilter,
            {
                headers: {
                    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
                },
            }
        );

        if (response.data.data.length > 0) {
            return res.status(400).json({
                message: "해당 이메일로 이미 가입된 계정이 존재합니다.",
            });
        }

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

        const userInfoFilter = {
            bpname: "SignUp (Geun)",
            lineitem: "yes",
            lineitem_fields: "cegType;cegCreatedAt2;cegIPAdress",
            filter_condition: "status=Active",
            filter_criteria: {
                filter: [
                    {
                        field: "cegEmail",
                        value: email,
                        condition_type: "eq",
                    },
                ],
            },
            record_fields: "cegUserName;cegEmail;cegPassword;cegRefreshToken",
        };

        // check if user already exists
        const user = await axios.post(`${API_URL}/records`, userInfoFilter, {
            headers: {
                Authorization: `Bearer ${API_ACCESS_TOKEN}`,
            },
        });

        if (user.data.data.length === 0) {
            return res.status(400).json({
                message: "잘못된 이메일 또는 비밀번호입니다.",
            });
        }

        const userData = user.data.data[0];

        // compare the password
        const validPassword = await bcrypt.compare(
            password,
            userData.cegPassword
        );
        if (!validPassword) {
            return res.status(400).json({
                message: "잘못된 이메일 또는 비밀번호입니다.",
            });
        }

        // If the email and password are valid, return user data
        return res.status(200).json({
            message: "사용자 로그인에 성공하였습니다.",
            user: {
                id: userData.record_no,
                username: userData.cegUserName,
                email: userData.cegEmail,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "서버 에러가 발생했습니다.",
        });
    }
};
