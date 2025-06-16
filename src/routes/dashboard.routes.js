import express from "express";
const router = express.Router();
import { updateDashboardStats, getDashboardStats } from "../controllers/dashboard.controller.js";

router.get("/", getDashboardStats);
router.post("/update", updateDashboardStats);

export default router; 