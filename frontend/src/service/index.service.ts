import axios from "axios";
import { UserType } from "@customTypes/userType";

const apiUrl = "http://localhost:4000/api/";

// register the user service
export const registerUser = async (user: UserType) => {
    try {
        const response = await axios.post(`${apiUrl}user/register`, user);
        return response.data;
    } catch (error) {
        return error;
    }
};

// login the user service
export const loginUser = async (user: Partial<UserType>) => {
    try {
        const response = await axios.post(`${apiUrl}user/login`, user);
        return response.data;
    } catch (error) {
        return error;
    }
};
