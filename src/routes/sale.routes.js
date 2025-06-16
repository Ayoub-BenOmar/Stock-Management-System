import express from "express";
const router = express.Router();
import { createSale } from "../controllers/sale.controller.js";

router.post("/", createSale);

export default router;