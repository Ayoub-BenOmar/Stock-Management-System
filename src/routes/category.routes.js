import express from "express";
const router = express.Router();
import { addCategory, deleteCategory, getAllCategories } from "../controllers/category.controller.js";

router.post("/add", addCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/get", getAllCategories);

export default router;