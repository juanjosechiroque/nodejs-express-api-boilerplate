import { Router } from "express";
import {
    getProductsHandler,
    createProductHandler,
} from "./products.controller.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { createProductSchema } from "./products.validation.js";

const router = Router();

router.get("/", getProductsHandler);
router.post(
    "/",
    authenticate,
    validate(createProductSchema),
    createProductHandler
);

export default router;
