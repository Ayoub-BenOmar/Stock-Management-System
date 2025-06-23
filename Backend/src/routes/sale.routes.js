import express from "express";
const router = express.Router();
import { createSale, getSales, getSale, getSalesByProduct } from "../controllers/sale.controller.js";

router.post("/", createSale);
router.get("/", getSales);
router.get("/:id", getSale);
router.get("/product/:productId", getSalesByProduct);

export default router;