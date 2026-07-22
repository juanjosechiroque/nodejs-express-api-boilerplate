import { describe, expect, it, vi } from "vitest";
import type { Request, Response } from "express";
import { rateLimitHandler } from "./rateLimitHandler.js";

describe("rateLimitHandler", () => {
    it("returns the standard API error shape", () => {
        const status = vi.fn();
        const json = vi.fn();
        const res = { status, json } as unknown as Response;
        status.mockReturnValue(res);

        rateLimitHandler({} as Request, res, vi.fn(), {} as never);

        expect(status).toHaveBeenCalledWith(429);
        expect(json).toHaveBeenCalledWith({
            status: 429,
            code: "TooManyRequests",
            message: "Too many requests, please try again later",
        });
    });
});
