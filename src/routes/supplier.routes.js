import express from "express";
const router = express.Router();
import { createSupplier, getSuppliers, getSupplier } from "../controllers/supplier.controller.js";

router.post("/", createSupplier);
router.get("/", getSuppliers);
router.get("/:id", getSupplier);

export default router; 