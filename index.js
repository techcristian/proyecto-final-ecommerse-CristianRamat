import express from 'express';
import {Router} from 'express';
import cors from 'cors';
const router = Router();
import authRouter from "./src/routes/auth.routes.js";
import routerProducts from './src/routes/products.routes.js';
import { getAllProducts } from './src/controllers/products.controllers.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//peticion Get
router.get("/", getAllProducts)
app.use("/", router); 
//Rutas
app.use("/api",routerProducts);

app.use("/api/auth", authRouter);

//Middlewares errorHandler
app.use((req,res,next)=>{
  res.status(404).json({error:"Recurso o ruta no encontrada, verifique."})
})
app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);