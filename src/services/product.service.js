import { 
    addProduct as addProductModel,
    getAllProducts as getAllProductsModel 
} from "../models/product.model.js";

  export const addProduct = async (data) => {
    return await addProductModel(data);
  };
  
  export const getAllProducts = async () => {
    return await getAllProductsModel();
  };
  
//   export const getProductById = async (id) => {
//     return await getProductByIdModel(id);
//   };
  
//   export const updateProduct = async (id, data) => {
//     return await updateProductModel(id, data);
//   };
  
//   export const deleteProduct = async (id) => {
//     return await deleteProductModel(id);
//   };
  