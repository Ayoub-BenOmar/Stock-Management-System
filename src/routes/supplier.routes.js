import express from "express";
const router = express.Router();
import { createSupplier, getSuppliers } from "../controllers/supplier.controller.js";

router.post("/", createSupplier);
router.get("/", getSuppliers);

export default router; 