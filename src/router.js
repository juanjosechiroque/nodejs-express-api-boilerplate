import { Router } from "express";

import routerProducts from "./api/products/products.router.js";
import routerUsers from "./api/users/users.router.js";

const router = Router();

router.use("/products", routerProducts);
router.use("/users", routerUsers);

export default router;
