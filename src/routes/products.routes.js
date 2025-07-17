import {Router} from 'express';
import { createProduct, deleteProduct, getAllProducts, getProdutById, searchProduct, updateProduct } from '../controllers/products.controllers.js';

const router = Router();

//peticion Get/products, all products
router.get("/products",getAllProducts);
//peticion Get/search
router.get("/products/search",searchProduct);
//peticion Get/:id
router.get("/products/:id", getProdutById);
//peticion Post
router.post("/products", createProduct);
//peticion Put
router.put("/products/:id", updateProduct);
//peticion Delete
router.delete("/products/:id", deleteProduct);


export default router;