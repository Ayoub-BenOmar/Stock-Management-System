import {
  addProduct as addProductService,
  getAllProducts as getAllProductsService
} from "../services/product.service.js";

export const addProduct = async (req, res) => {
  try {
    const product = await addProductService(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
