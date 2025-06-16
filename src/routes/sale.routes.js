import express from "express";
const router = express.Router();
import { createSale, getSales } from "../controllers/sale.controller.js";

router.post("/", createSale);
router.get("/", getSales);

export default router;