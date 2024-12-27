import { jest } from "@jest/globals";

jest.unstable_mockModule("../api/users/users.dao.js", () => ({
    createUserDao: jest.fn().mockResolvedValue({ name: "test@example.com" }),
    existsEmailUserDao: jest.fn().mockResolvedValue(false),
}));

jest.unstable_mockModule("../utils/jwt.js", () => ({
    generateToken: jest.fn(),
    verifyToken: jest.fn(),
}));

const { api } = await import("./helpers.js");

const { existsEmailUserDao } = await import("../api/users/users.dao.js");

describe("POST /users/singup", () => {
    test("should return a new user", async () => {
        const data = { email: "test@example.com", password: "test123" };
        const response = await api.post("/users/signup").send(data);
        expect(response.status).toBe(201);
    });

    test("should return an error when email is already registered", async () => {
        existsEmailUserDao.mockResolvedValueOnce(true);

        const data = { email: "test@example.com", password: "test123" };
        const response = await api.post("/users/signup").send(data);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
            "Email address is already registered"
        );
    });

    test("should return an error when input is invalid", async () => {
        const response = await api.post("/users/signup");
        expect(response.status).toBe(400);
    });
});
