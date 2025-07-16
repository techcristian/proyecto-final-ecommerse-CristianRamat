
const products = [
  { id: 1, name: "Camiseta deportiva", price: 100 },
  { id: 2, name: "Zapatilla Running", price: 200 },
  { id: 3, name: "Mochila Escolar", price: 300 },
  { id: 4, name: "Auriculares Bluetooth", price: 400 },
  { id: 5, name: "Botella Termica", price: 500 }
]
export const getAllProducts = (req, res) => {
  res.json(products);
}
export const searchProduct = (req, res) => {
  console.log(req.query);
  const { name } = req.query;
  const filtered = products.filter((p) => p.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));

  res.json(filtered);
}
export const getProdut = (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id == id);
  if (!product) {
    res.status(404).json({ message: "Producto no encontrados, verifique." })
  }
  res.json(product);
}
export const createProduct = (req, res) => {
  console.log(req.body);
  const { name, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price
  }
  products.push(newProduct);
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
   const productIndex = products.findIndex((p)=> p.id === productId);

   if(productIndex === -1){
    return res.status(404).json({error:"Producto no encontrado,verifique."})
   }
   products.splice(productIndex,1);
   res.status(200).json({message:"Producto eliminado exitosamente."})
}; 