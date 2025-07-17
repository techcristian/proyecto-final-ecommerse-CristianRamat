import * as model from '../models/products.model.js'

export const getAllProducts =async (req, res) => {
  res.json(await model.getAllProducts());
}
export const searchProduct = (req, res) => {
  console.log(req.query);
  const { name } = req.query;
  const filtered = products.filter((p) => p.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));

  res.json(filtered);
}
export const getProdutById = (req, res) => {
  const { id } = req.params;
  const product = model.getProductsById(id);
  if (!product) {
    res.status(404).json({ message: "Producto no encontrados, verifique." })
  }
  res.json(product);
}
export const createProduct = (req, res) => {
  const { name, price,categoria } = req.body;
  const newProduct=model.createProduct({name,price,categoria});
  res.status(201).json(newProduct);

}
export const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex= products.findIndex((p) => p.id === productId);
  if(productIndex === -1){
    return res.status(404).json({message:"Producto no encontardo, verifique."})
  }
  const {name,price} = req.body;
  products[productIndex]={id:productId, name, price};
  res.status(200).json(products[productIndex]);

};
export const deleteProduct = (req,res)=>{
   const productId = parseInt(req.params.id, 10);
 const productDeleted=model.deleteProduct(productId);
  if(productDeleted == null){
     return res.status(404).json({error:"Producto no encontrado,verifique."})
    }else{
       res.status(204).json({message:"Producto eliminado exitosamente."})
    }
  
}; 