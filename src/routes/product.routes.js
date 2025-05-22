import express from "express";
const router = express.Router();
import { addProduct, getAllProducts, getProductById } from '../controllers/product.controller.js';

router.post("/add", addProduct);
router.get("/get", getAllProducts);
router.get("/get/:id", getProductById);

export default router;