import jwt from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRATION_TIME } from "../config.js";

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION_TIME,
    });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        throw new Error("Token inválido o expirado");
    }
};
