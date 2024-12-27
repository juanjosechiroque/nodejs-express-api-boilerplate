import { jest } from "@jest/globals";

jest.unstable_mockModule("../api/products/products.dao.js", () => ({
    createProductDao: jest.fn().mockReturnValue({ name: "test", price: 10 }),
    getProductsDao: jest.fn().mockResolvedValue([
        { id: 1, name: "Mocked Product 1", price: 10 },
        { id: 2, name: "Mocked Product 2", price: 20 },
    ]),
}));

jest.unstable_mockModule("../utils/jwt.js", () => ({
    generateToken: jest.fn(),
    verifyToken: jest.fn((token) => {
        if (token === "valid-token") {
            return { id: 1, name: "Mock User" };
        }
        throw new Error("Token inválido o expirado");
    }),
}));

const { api } = await import("./helpers.js");

describe("GET /products", () => {
    test("should return a list of products", async () => {
        const response = await api.get("/products");
        expect(response.status).toBe(200);
    });
});

describe("POST /products", () => {
    test("should return a new product", async () => {
        const data = { name: "test", price: 10 };

        const response = await api
            .post("/products")
            .set("Authorization", "Bearer valid-token")
            .send(data);

        expect(response.status).toBe(201);

        const resultData = response.body.data;
        expect(resultData.name).toBe(data.name);
        expect(resultData.price).toBe(data.price);
    });

    test("should return an error when input is invalid", async () => {
        const response = await api
            .post("/products")
            .set("Authorization", "Bearer valid-token");

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    });

    test("should return an error when token is unauthorized", async () => {
        const response = await api
            .post("/products")
            .set("Authorization", "random token");

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized");
    });

    test("should return an error when token is empty", async () => {
        const response = await api
            .post("/products")
            .set("Authorization", "Bearer ");

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Access denied");
    });

    test("should return an error when token is invalid", async () => {
        const response = await api
            .post("/products")
            .set("Authorization", "Bearer invalid-token");

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
            "message",
            "Invalid or expired token"
        );
    });
});
