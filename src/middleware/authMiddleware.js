import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.slice(7).trim();

    if (!token || token === "") {
        return res.status(401).json({ message: "Access denied" });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
