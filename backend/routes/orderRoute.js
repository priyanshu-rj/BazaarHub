import express from 'express';
import authMiddleware from '../middleware/auth.js'
import { placeOrder, verifyOrder,userOrders, listOrders, updateStatus } from '../controller/ordercontroller.js';

const orderRouter = express.Router();
//route here rest of part PK this for admin
orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/verify',verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateStatus)

export default orderRouter;
