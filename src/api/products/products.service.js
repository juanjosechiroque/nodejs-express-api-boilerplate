import {
    createProductDao,
    getProductsDao,
    updateProductDao,
    deleteProductDao,
} from "./products.dao.js";

export async function getProducts() {
    const result = await getProductsDao();
    return result;
}

export async function createProduct({ name, price }) {
    return await createProductDao({ name, price });
}

export async function updateProduct({ id, name, price }) {
    return await updateProductDao({ id, name, price });
}

export async function deleteProduct(productId) {
    const result = await deleteProductDao(productId);
    return result;
}
