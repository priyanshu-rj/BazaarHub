import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';
import foodRouter from './routes/foodroutes.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(cors()); 

//database
connectDB();


app.get("/", (req, res) => {
    res.send("API WORKING");
});


//api endpoint
app.use("/api/food",foodRouter);
app.use('/images',express.static('uploads'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

