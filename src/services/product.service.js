import { 
    addProduct as addProductModel,
    getAllProducts as getAllProductsModel,
    getProductById as getProductByIdModel
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
  