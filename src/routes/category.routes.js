import express from "express";
const router = express.Router();
import { addCategory, deleteCategory } from "../controllers/category.controller.js";

router.post("/add", addCategory);
router.delete("/delete/:id", deleteCategory);

export default router;