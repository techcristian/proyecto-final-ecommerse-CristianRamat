import * as model from '../models/products.model.js'

//obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await model.getAllProducts();
    if (products) {
      res.status(200).json(products);
    } else {
      res.json({ message: "No exiten productos." })
    }
  } catch (error) {
    res.json(error);
  }
}
//Buscar producto por item
export const searchProduct = async (req, res) => {
  try {
    const { name, price, category } = req.query;

    const filtered = await model.searchProduct({ name, price, category });

    if (!filtered || filtered.length === 0) {
      return res.json({ message: "No se encontraron coincidencias" });
    }
    // primer resultado como JSON 
    res.json(filtered[0]);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
// Get by Id
export const getProdutById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await model.getProductById(id);
    if (!product) {
      res.status(404).json({ message: "Producto no encontrados, verifique." })
    }
    res.json(product);
  } catch (error) {
    res.json(error);
  }
}
// Post
export const createProduct = async (req, res) => {
  try {
    const newProduct = await model.createProduct(req.body);
    if (!newProduct) {
      res.json({ message: "Verifique que todos los campos son requeridos" })
    } else {
      res.status(201).json(newProduct);
    }
  } catch (error) {
    res.json(error);
  }

}
// Update
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, categories } = req.body;
    //validar 
    if (!name || !price || !categories) {
      return res.status(404).json({ message: "Verifique parametro o campos completos para actualizar." })
    }
    const updated = await model.updateProduct(productId, { name, price, categories });
    if (!updated) {
      return res.status(404).json({ message: "Verifique parametro o campos completos para actualizar." })
    }
    res.status(200).json(updated);
  } catch (error) {
    res.json(error);
  }

};
// Delete
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productDeleted = await model.deleteProduct(productId);
    if (!productDeleted) {
      return res.status(404).json({ error: "Producto no encontrado,verifique." })
    } else {
      res.status(204).json({ message: "Producto eliminado exitosamente." })
    }
  } catch (error) {
    res.json(error);
  }
}; 