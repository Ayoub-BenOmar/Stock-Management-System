import express from "express";
const router = express.Router();
import { addProduct, getAllProducts, getProductById, updateProduct} from '../controllers/product.controller.js';

router.post("/add", addProduct);
router.get("/get", getAllProducts);
router.get("/get/:id", getProductById);
router.put("/update/:id", updateProduct);

export default router;