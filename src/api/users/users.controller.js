import { registerUser } from "./users.service.js";
import { sendResponse } from "../../utils/response.js";

export async function registerUserHandler(req, res, next) {
    try {
        const { email, password } = req.body;
        const result = await registerUser({ email, password });
        sendResponse(res, 201, result);
    } catch (error) {
        next(error);
    }
}
