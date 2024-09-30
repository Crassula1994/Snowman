import crypto from "crypto";

const signSessionToken = (): string => {
    return crypto.randomBytes(16).toString("hex");
};

export default signSessionToken;
