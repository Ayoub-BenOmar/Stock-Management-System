import express from "express";
const router = express.Router();
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;