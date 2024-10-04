import { Request, Response } from "express";
import axios from "axios";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import moment from "moment-timezone";
import requestIp from "request-ip";

// ----------------------------------------------------------------------------------------------------

dotenv.config();
const API_URL = process.env.API_URL;
const API_ACCESS_TOKEN = process.env.API_ACCESS_TOKEN;

// ----------------------------------------------------------------------------------------------------

// Controller for Registering New User
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { userId, userName, email, password } = req.body;

        if (!userId || !userName || !email || !password) {
            res.status(400).json({
                message: "회원가입에 필요한 정보가 모두 입력되지 않았어요.",
            });
            return;
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
            res.status(400).json({
                message: "해당 이메일로 이미 가입된 계정이 있어요.",
            });
            return;
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
                    cegUserID: userId,
                    cegUserName: userName,
                },
            ],
        };

        await axios.post(`${API_URL}/record`, userData, {
            headers: {
                Authorization: `Bearer ${API_ACCESS_TOKEN}`,
            },
        });

        res.status(200).json({
            message: "회원가입에 성공했어요.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "서버 에러가 발생했어요.",
        });
    }
};

// ----------------------------------------------------------------------------------------------------

// Controller for Login
export const signInUser = async (req: Request, res: Response) => {
    try {
        const { userId, password } = req.body;

        // Check if User ID and Password Input Exist
        if (!userId || !password) {
            res.status(400).json({
                message: "아이디와 비밀번호를 입력해 주세요.",
            });
            return;
        }

        const userInfoFilter = {
            bpname: "Sign-Up-Snowman",
            lineitem: "no",
            filter_condition: "status=Active",
            filter_criteria: {
                filter: [
                    {
                        field: "cegUserID",
                        value: userId,
                        condition_type: "eq",
                    },
                ],
            },
            record_fields: "cegUserID;cegUserName;cegEmail;cegPassword",
        };
        const userInfo = await axios.post(
            `${API_URL}/records`,
            userInfoFilter,
            {
                headers: {
                    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
                },
            }
        );

        // Check if User ID Exists in Database
        if (userInfo.data.data.length === 0) {
            res.status(400).json({
                message: "잘못된 아이디 또는 비밀번호예요.",
            });
            return;
        }

        const userData = userInfo.data.data[0];
        const isValidPassword = await bcrypt.compare(
            password,
            userData.cegPassword
        );
        const signInStatus = isValidPassword ? "Success" : "Failure";
        const userLogData = {
            options: {
                bpname: "Sign-Up-Snowman",
            },
            data: [
                {
                    _bp_lineitems: [
                        {
                            cegIPAddress: requestIp.getClientIp(req),
                            cegLogCreatedAt: moment()
                                .utc()
                                .format("MM-DD-YYYY HH:mm:ss"),
                            cegLogType: `Login ${signInStatus}`,
                            short_desc: `User ${userData.userID} Sign-in Process ${signInStatus}`,
                        },
                    ],
                    record_no: userData.record_no,
                },
            ],
        };

        // Add User Sign-in Log in Database
        await axios.put(`${API_URL}/record`, userLogData, {
            headers: {
                Authorization: `Bearer ${API_ACCESS_TOKEN}`,
            },
        });

        // Check if Password is Correct
        if (!isValidPassword) {
            res.status(400).json({
                message: "잘못된 아이디 또는 비밀번호예요.",
            });
            return;
        }

        // Create Session for User Authentication
        req.session.user = {
            userId: userData.cegUserID,
            userName: userData.cegUserName,
            email: userData.cegEmail,
            recordNo: userData.record_no,
        };

        // Return User Data if Login is Valid
        res.status(200).json({
            message: "사용자 로그인에 성공했어요.",
            user: {
                userId: req.session.user.userId,
                userName: req.session.user.userName,
                email: req.session.user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "서버 에러가 발생했어요.",
        });
    }
};

// ----------------------------------------------------------------------------------------------------

// Controller for Logout
export const signOutUser = async (req: Request, res: Response) => {
    try {
        const userLogData = {
            options: {
                bpname: "Sign-Up-Snowman",
            },
            data: [
                {
                    _bp_lineitems: [
                        {
                            cegIPAddress: requestIp.getClientIp(req),
                            cegLogCreatedAt: moment()
                                .utc()
                                .format("MM-DD-YYYY HH:mm:ss"),
                            cegLogType: "Logout Success",
                            short_desc: `User ${
                                req.session.user!.userId
                            } Sign-out Process Success`,
                        },
                    ],
                    record_no: req.session.user!.recordNo,
                },
            ],
        };

        // Add User Sign-out Log in Database
        await axios.put(`${API_URL}/record`, userLogData, {
            headers: {
                Authorization: `Bearer ${API_ACCESS_TOKEN}`,
            },
        });

        // Remove Session for User Authentication
        req.session.destroy(function () {
            req.session;
        });

        // Return Success Message
        res.status(200).json({
            message: "사용자 로그아웃에 성공했어요.",
        });
    } catch (error) {
        res.status(500).json({
            message: "서버 에러가 발생했어요.",
        });
    }
};

// ----------------------------------------------------------------------------------------------------

// Controller for Getting User Information
export const getUserInfo = async (req: Request, res: Response) => {
    try {
        if (req.session.user) {
            const userInfoFilter = {
                bpname: "Sign-Up-Snowman",
                lineitem: "yes",
                lineitem_fields: "cegLogType;cegLogCreatedAt;cegIPAddress",
                filter_condition: "status=Active",
                filter_criteria: {
                    filter: [
                        {
                            field: "cegUserID",
                            value: req.session.user.userId,
                            condition_type: "eq",
                        },
                    ],
                },
            };
            const userLogData = await axios.post(
                `${API_URL}/records`,
                userInfoFilter,
                {
                    headers: {
                        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
                    },
                }
            );

            const signInLog = userLogData.data.data[0]._bp_lineitems.map(
                (item: {
                    cegLogType: string;
                    cegLogCreatedAt: string;
                    cegIPAddress: string;
                }) => ({
                    date: item.cegLogCreatedAt,
                    type: item.cegLogType,
                    address: item.cegIPAddress,
                })
            );

            res.status(200).json({
                message: "사용자는 현재 로그인 중입니다.",
                authenticated: true,
                user: {
                    id: req.session.user!.userId,
                    username: req.session.user!.userName,
                    email: req.session.user!.email,
                    signInLog,
                },
            });
        } else {
            res.status(200).json({
                message: "사용자는 현재 로그인 중이 아닙니다.",
                authenticated: false,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "서버 에러가 발생했습니다.",
        });
    }
};
