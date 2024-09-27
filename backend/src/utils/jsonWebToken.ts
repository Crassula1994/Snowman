import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const signAccessToken = (user: object): string => {
    const accessToken = jwt.sign(user, JWT_SECRET_KEY!, {
        expiresIn: "1h",
    });

    return accessToken;
};

const signRefreshToken = (): string => {
    const refreshToken = jwt.sign({}, JWT_SECRET_KEY!, {
        expiresIn: "3d",
    });

    return refreshToken;
};

export { signAccessToken, signRefreshToken };
