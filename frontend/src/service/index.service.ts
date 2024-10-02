import axios from "axios";
import { UserType } from "@customTypes/userType";

const apiUrl = "http://localhost:4000/api";

// register the user service
export const registerUser = async (user: UserType) => {
    try {
        const response = await axios.post(`${apiUrl}/user/register`, user);
        return response.data;
    } catch (error) {
        return error;
    }
};

// login the user service
export const loginUser = async (user: Partial<UserType>) => {
    try {
        const response = await axios.post(`${apiUrl}/user/login`, user);
        return response.data;
    } catch (error) {
        return error;
    }
};

// logout the user service
export const logoutUser = async () => {
    try {
        const response = await axios.post(`${apiUrl}/user/logout`);
        return response.data;
    } catch (error) {
        return error;
    }
};

// check user is login
export const checkLogin = async () => {
    try {
        const response = await axios.get(`${apiUrl}/user/check`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};
