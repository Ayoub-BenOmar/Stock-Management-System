import express from "express";
const router = express.Router();
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct} from '../controllers/product.controller.js';

router.post("/add", addProduct);
router.get("/get", getAllProducts);
router.get("/get/:id", getProductById);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;