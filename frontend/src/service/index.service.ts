import axios from "axios";
import { UserType } from "@customTypes/userType";

const API_URL = "http://localhost:4000/api";

// register the user service
export const registerUser = async (user: UserType) => {
    try {
        const response = await axios.post(`${API_URL}/user/register`, user, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

// login the user service
export const loginUser = async (user: Partial<UserType>) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, user, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

// logout the user service
export const logoutUser = async () => {
    try {
        const response = await axios.post(
            `${API_URL}/user/logout`,
            {},
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

// check user is login
export const checkLogin = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/user-info`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};
