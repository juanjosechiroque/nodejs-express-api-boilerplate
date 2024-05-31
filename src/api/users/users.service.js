import { generateToken } from "../../utils/jwt.js";

export function registerUser(email) {
    const token = generateToken({ email });
    return token;
}
