import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} from "./products.service.js";

import { sendResponse } from "../../utils/response.js";
import { NotFoundError } from "../../errors.js";

export async function getProductsHandler(req, res, next) {
    try {
        const result = await getProducts();
        sendResponse(res, 200, result);
    } catch (error) {
        next(error);
    }
}

export async function createProductHandler(req, res, next) {
    try {
        const { name, price } = req.body;
        const result = await createProduct({ name, price });
        sendResponse(res, 201, result);
    } catch (error) {
        next(error);
    }
}

export async function updateProductHandler(req, res, next) {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        const result = await updateProduct({ id, name, price });
        if (!result) throw NotFoundError("Product not found");

        sendResponse(res, 200, result);
    } catch (error) {
        next(error);
    }
}

export async function deleteProductHandler(req, res) {
    try {
        const productId = req.params.id;
        const result = await deleteProduct(productId);

        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error deleting product:", error.message);
        res.status(500).json({
            message: "Error deleting product",
            error: error.message,
        });
    }
}
