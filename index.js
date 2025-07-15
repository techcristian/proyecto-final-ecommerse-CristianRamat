import express from 'express';
import cors from 'cors';
const app = express();

const PORT = 3000;

const products = [
  { id: 1, name: "Camiseta deportiva", price: 100 },
  { id: 2, name: "Zapatilla Running", price: 200 },
  { id: 3, name: "Mochila Escolar", price: 300 },
  { id: 4, name: "Auriculares Bluetooth", price: 400 },
  { id: 5, name: "Botella Termica", price: 500 }
]
//Middlewares
app.use(express.json());
app.use(cors());

//peticion Get
app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos a la API REST ecommerse de NodeJS" });
})
app.get("/products", (req, res) => {
  res.json(products);
})
//peticion Get/search
app.get("/products/search", (req, res) => {
  console.log(req.query);
  const { name } = req.query;
  const filtered = products.filter((p) => p.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));

  res.json(filtered);
})
//peticion Get/:id
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id == id);
  if (!product) {
    res.status(404).json({ message: "Producto no encontrados, verifique." })
  }
  res.json(product);
})
//peticion Post
app.post("/products", (req, res) => {
  console.log(req.body);
  const { name, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price
  }
  products.push(newProduct);
  res.status(201).json(newProduct);

})
//peticion Put
app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex= products.findIndex((p) => p.id === productId);
  if(productIndex === -1){
    return res.status(404).json({message:"Producto no encontardo, verifique."})
  }
  const {name,price} = req.body;
  products[productIndex]={id:productId, name, price};
  res.status(200).json(products[productIndex]);

})
//peticion Delete
app.delete("/products/:id", (req,res)=>{
   const productId = parseInt(req.params.id, 10);
   const productIndex = products.findIndex((p)=> p.id === productId);

   if(productIndex === -1){
    return res.status(404).json({error:"Producto no encontrado,verifique."})
   }
   products.splice(productIndex,1);
   res.status(200).json({message:"Producto eliminado exitosamente."})
})
//Middlewares errorHandler
app.use((req,res,next)=>{
  res.status(404).json({error:"Recurso o ruta no encontrada, verifique."})
})
app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);