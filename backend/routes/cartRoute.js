import express from "express";

import { addToCart,removeFromCart,getCart } from "../controller/cart.js";

import authMiddleware from "../middleware/auth.js";



const cartRouter = express.Router();
//route addtocar remove cart and get cart here PK
cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)

export default cartRouter;
