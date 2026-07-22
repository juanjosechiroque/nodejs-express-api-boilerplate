import type { RateLimitExceededEventHandler } from "express-rate-limit";

export const rateLimitHandler: RateLimitExceededEventHandler = (_req, res) => {
    res.status(429).json({
        status: 429,
        code: "TooManyRequests",
        message: "Too many requests, please try again later",
    });
};
