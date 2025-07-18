import {Router} from 'express';
const router = Router();
import { createProduct, deleteProduct, getAllProducts, getProdutById, searchProduct, updateProduct } from '../controllers/products.controllers.js';
import  auth  from "../middlewares/auth.middlewares.js";


//router.get("/",getAllProducts);
//peticion Get/products, all products
router.get("/products",getAllProducts);
//peticion Get/search
router.get("/products/search",auth,searchProduct);
//peticion Get/:id
router.get("/products/:id",auth, getProdutById);
//peticion Post
router.post("/products",auth, createProduct);
//peticion Put
router.put("/products/:id",auth, updateProduct);
//peticion Delete
router.delete("/products/:id",auth, deleteProduct);


export default router;