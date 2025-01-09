import { Router } from "express";
import { registerUserHandler } from "./users.controller.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { registerUserSchema } from "./users.validation.js";

const router = Router();

router.post("/signup", validate(registerUserSchema), registerUserHandler);

export default router;
