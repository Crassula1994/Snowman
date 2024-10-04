import { Request, Response } from "express";
import axios from "axios";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import moment from "moment-timezone";

dotenv.config();

const API_URL = process.env.API_URL;
const API_ACCESS_TOKEN = process.env.API_ACCESS_TOKEN;

// register a new user
export const register = async (req: Request, res: Response) => {
    try {
        // get the user data from the request body
        const { userId, userName, email, password } = req.body;

        // check if user data is provided
        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "Please provide all user details",
            });
        }

        const emailListFilter = {
            bpname: "Sign-Up-Snowman",
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
            return res.status(403).json({
                message: "해당 이메일로 이미 가입된 계정이 존재합니다.",
            });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            options: {
                bpname: "Sign-Up-Snowman",
            },
            data: [
                {
                    cegCreatedAt: moment().utc().format("MM-DD-YYYY HH:mm:ss"),
                    cegEmail: email,
                    cegPassword: hashedPassword,
                    cegUserId: userId,
                    cegUserName: userName,
                },
            ],
        };

        await axios.post(`${API_URL}/record`, userData, {
            headers: {
                Authorization: `Bearer ${API_ACCESS_TOKEN}`,
            },
        });

        return res.status(200).json({
            message: "회원가입이 정상적으로 완료되었습니다.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "서버 에러가 발생했습니다.",
        });
    }
};

// login a user
export const login = async (req: Request, res: Response) => {
    try {
        // get the user data from the request body
        const { userId, password } = req.body;

        // check if user data is provided
        if (!userId || !password) {
            return res.status(400).json({
                message: "아이디 또는 비밀번호를 입력하여 주십시오.",
            });
        }

        const userInfoFilter = {
            bpname: "Sign-Up-Snowman",
            lineitem: "yes",
            lineitem_fields: "cegLogType;cegLogCreatedAt;cegIPAddress",
            filter_condition: "status=Active",
            filter_criteria: {
                filter: [
                    {
                        field: "cegUserId",
                        value: userId,
                        condition_type: "eq",
                    },
                ],
            },
            record_fields: "cegUserId;cegUserName;cegEmail;cegPassword",
        };

        // check if user already exists
        const user = await axios.post(`${API_URL}/records`, userInfoFilter, {
            headers: {
                Authorization: `Bearer ${API_ACCESS_TOKEN}`,
            },
        });

        if (user.data.data.length === 0) {
            return res.status(400).json({
                message: "잘못된 아이디 또는 비밀번호입니다.",
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
                message: "잘못된 아이디 또는 비밀번호입니다.",
            });
        }

        // session Created
        req.session.user = {
            userId: userData.cegUserId,
            userName: userData.cegUserName,
            email: userData.cegEmail,
        };
        req.session.isOnline = true;

        console.log("로그인시", req.session);

        // If the email and password are valid, return user data
        return res.status(200).json({
            message: "사용자 로그인에 성공하였습니다.",
            user: {
                id: req.session.user.userId,
                username: req.session.user.userName,
                email: req.session.user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "서버 에러가 발생했습니다.",
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        req.session.destroy(function () {
            req.session;
        });

        return res.status(200).json({
            message: "사용자 로그아웃에 성공하였습니다.",
        });
    } catch (error) {
        return res.status(500).json({
            message: "서버 에러가 발생했습니다.",
        });
    }
};

export const checkUser = async (req: Request, res: Response) => {
    try {
        console.log("Session: ", req.session);
        if (req.session.user) {
            return res.status(200).json({
                message: "사용자는 현재 로그인 중입니다.",
                authenticated: true,
                user: {
                    id: req.session.user!.userId,
                    username: req.session.user!.userName,
                    email: req.session.user!.email,
                },
            });
        } else {
            return res.status(201).json({
                message: "사용자는 현재 로그인 중이 아닙니다.",
                authenticated: false,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "서버 에러가 발생했습니다.",
        });
    }
};
