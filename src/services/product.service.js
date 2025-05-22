import { 
    addProduct as addProductModel,
    getAllProducts as getAllProductsModel,
    getProductById as getProductByIdModel,
    updateProduct as updateProductService
} from "../models/product.model.js";

  export const addProduct = async (data) => {
    return await addProductModel(data);
  };
  
  export const getAllProducts = async () => {
    return await getAllProductsModel();
  };
  
  export const getProductById = async (id) =>{
    return await getProductByIdModel(id);
  }

  export const updateProduct = async(id, data) =>{
    return await updateProductService(id, data);
  } 
  