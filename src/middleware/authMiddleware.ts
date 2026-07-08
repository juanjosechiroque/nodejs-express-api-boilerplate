import type { NextFunction, Request, Response } from "express";
import { getUserInactiveReason } from "../api/user/user.service.js";
import { verifyToken } from "../utils/jwt.js";
import { UnauthorizedError } from "../errors.js";
import logger from "../utils/logger.js";

const bearerTokenRegex = /^Bearer\s+(\S+)$/i;

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    const match = authHeader?.match(bearerTokenRegex);

    if (!match) {
        return next(UnauthorizedError("Authorization header missing or invalid"));
    }

    const token = match[1];
    if (!token) {
        return next(UnauthorizedError("Authorization header missing or invalid"));
    }

    try {
        const decoded = verifyToken(token);
        const inactiveReason = await getUserInactiveReason(decoded.sub);

        if (inactiveReason) {
            logger.warn(
                { userId: decoded.sub, reason: inactiveReason, ip: req.ip },
                "Auth user rejected"
            );
            return next(UnauthorizedError("Invalid or expired token", "INVALID_TOKEN"));
        }

        req.user = decoded;
        next();
    } catch (error) {
        const code = error instanceof Error && "code" in error ? error.code : undefined;
        logger.warn({ err: error, ip: req.ip, code }, "Auth token rejected");
        return next(error);
    }
};
