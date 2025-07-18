
import { db } from '../services/firebase.js';
//obtener todos los productos
export const getAllProducts = async () => {
  try {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    throw error;
  }
};
// Obtener busqueda
export const searchProduct = async ({ name, price, category }) => {
  try {
    const productsRef = db.collection('products');

    // Búsqueda por nombre en minúscula
    let query = productsRef;
    if (name) {
      const nameLower = name.toLowerCase();
      query = query
        .where('name', '>=', nameLower)
        .where('name', '<=', nameLower + '\uf8ff');
    }

    const snapshot = await query.get();

    if (snapshot.empty) return false;

    // Filtrado por precio y categoría
    let results = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filtrar por precio si se envió
    if (price) {
      results = results.filter(item => item.price == price); // == para evitar errores por tipo
    }

    // Filtrar por categoría si se envió
    if (category) {
      results = results.filter(item => 
        item.categories && item.categories.includes(category.toLowerCase())
      );
    }
    return results;

  } catch (error) {
    throw error
  }
};
   
// Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const doc = await db.collection('products').doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw error;
  }
};
// Crear un producto
export const createProduct = async (data) => {
  try {
    const docRef = await db.collection('products').add(data);
    return { id: docRef.id, ...data };
  } catch (error) {
    throw error;
  }
};
// Eliminar un producto
export const deleteProduct = async (id) => {
  try {
    const doc = await db.collection('products').doc(id).get();
    if (!doc.exists) return false;

    await db.collection('products').doc(id).delete();
    return { id, ...doc.data() };
  } catch (error) {
    throw error;
  }
};
// Actualizar un producto
export const updateProduct = async (id, data) => {
  try {
   
    const docRef = db.collection('products').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return false;
    await docRef.update(data);
    const updatedDoc = await docRef.get();
   
    return { id: updatedDoc.id, ...updatedDoc.data() };
   
  } catch (error) {
    throw error;
  }
};
