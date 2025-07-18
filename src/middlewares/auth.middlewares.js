import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
 const auth = (req, res, next) => {
 try {
   const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.sendStatus(403);
    next();
  });
 } catch (error) {
  throw error
 }
};
export default auth;