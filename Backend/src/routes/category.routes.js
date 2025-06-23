import express from "express";
const router = express.Router();
import { createCategory, getCategories, getCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;