/*import fs from "node:fs";
import path from "node:path";
import { db } from './data.js'
import {collection, getDocs} from 'firebase/firestore';
const productsCollection = collection(db,'products');
export const getAllProducts = async () =>{
 try {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((doc) => ({id:doc.id, ...doc.data() }));

 } catch (error) {
  console.error(error);
 }
}*/
import { db } from '../services/firebase.js';

export const getAllProducts = async () => {
  try {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    console.error("Error al obtener productos de Firestore:", error);
    throw error;
  }
};

/*
const __dirname = import.meta.dirname;
const jsonPath = path.join(__dirname,"./products.json");
const json = fs.readFileSync(jsonPath,"utf-8");
const products= JSON.parse(json);

export const getAllProducts = () =>{
  return products;
}
export const getProductsById = (id) =>{
  return products.find((p)=>p.id == id)
}
export const createProduct = (data)=>{
  const newProduct = {
    id: products.length + 1,
    ...data
  }
  products.push(newProduct);
  fs.writeFileSync(jsonPath, JSON.stringify(products));

}
export const deleteProduct = (id)=>{
    const productIndex = products.findIndex((p)=> p.id === id);
   if(productIndex === -1){
    return null;
   }else{
        const product=products.splice(productIndex,1);
  fs.writeFileSync(jsonPath, JSON.stringify(products));
  return product;
   }
} */