import {
  addProduct as addProductService,
  getAllProducts as getAllProductsService,
  getProductById as getProductByIdService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService
} from "../services/product.service.js";

export const addProduct = async (req, res) => {
  try {
    const product = await addProductService(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async(req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);
    if(!product){
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
}; 

export const updateProduct = async(req, res) => {
  try {
    const product = await updateProductService(req.params.id, req.body);
    if(!product){
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
};

export const deleteProduct = async(req, res) =>{
  try{
    const product = await deleteProductService(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
};
