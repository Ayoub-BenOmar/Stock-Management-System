import { addProduct as productService } from "../services/product.service.js"

export const addProduct = async (req, res) => {
  try {
    const product = await productService(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // TODO: Implement getAllProducts service
    res.status(501).json({ message: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    // TODO: Implement getProductById service
    res.status(501).json({ message: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    // TODO: Implement updateProduct service
    res.status(501).json({ message: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // TODO: Implement deleteProduct service
    res.status(501).json({ message: "Not implemented yet" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const addProduct = (req, res) => {
//     // console.log("add Product function");
//     const addProduct = new Product({
//         name: req.body.name,
//         description: req.body.description,
//         quantity: req.body.quantity,
//         price: req.body.price
//     });

//     addProduct
//     .save()
//     .then((result) => {
//       res.status(200).send(result);
//     })
//     .catch((err) => {
//       res.status(402).send(err);
//     });
// }

// const getAllProducts = (req, res) =>{};
// const getProductById = (req, res) =>{};
// const updateProduct = (req, res) =>{};
// const deleteProduct = (req, res) =>{};

 
