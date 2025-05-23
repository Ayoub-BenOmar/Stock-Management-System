import { addCategory as addCategoryService,
        deleteCategory as deleteCategoryService
    } from "../services/category.service.js";

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await addCategoryService(name);
    res.status(201).json(category);
  } catch (error) {
    console.error("Add category error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async(req, res) => {
    try {
        const category = await deleteCategoryService(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    };
};


