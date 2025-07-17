import express from 'express';
import cors from 'cors';
import router from './src/routes/products.routes.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

//Middlewares
app.use(express.json());
app.use(cors());

//peticion Get
app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos a la API REST ecommerse de NodeJS" });
})
//Rutas
app.use("/api",router);

//Middlewares errorHandler
app.use((req,res,next)=>{
  res.status(404).json({error:"Recurso o ruta no encontrada, verifique."})
})
app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);