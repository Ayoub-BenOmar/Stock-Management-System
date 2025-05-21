import { addProduct as productModel } from "../models/product.model.js";

export const addProduct = async (data) => {
    return await productModel(data);
};

export const getAllProducts = async (data) => {
    return await productModel(data);
};