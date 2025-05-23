import { addCategory as addCategoryModel,
        deleteCategory as deleteCategoryModel
    } from "../models/category.model.js";

export const addCategory = async (name) => {
    return await addCategoryModel(name);
};

export const deleteCategory = async (id) => {
    return await deleteCategoryModel(id);
}

