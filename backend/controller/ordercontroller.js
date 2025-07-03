import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing user order front
const placeOrder = async (req, res) => {
  const frontend_url = "https://fusion-hub-frontend.onrender.com/";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      paymentMethod: "COD", 
      orderStatus: "Pending Payment" 
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully.", orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const verifyOrder = async (req,res) =>{
    const {orderId,success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payement:true});
            res.json({success:true,message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"not paid"})
        }
    } catch (error) {
        console.log(error);
    } 
}

//user order frontend

const userOrders = async (req,res) =>{
    try {
      const orders = await orderModel.find({userId:req.body.userId});
      res.json({success:true,data:orders})
    } catch (error) {
      console.log(error)
    }
}


//order for admin page
const listOrders = async (req,res) => {
    try {
      const orders = await orderModel.find({});
      res.json({success:true,data:orders})
    } catch (error) {
      console.log(error)
    }
}

//update the order from admin page approve type

const updateStatus = async (req,res) =>{
   try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"status update"})
   } catch (error) {
    console.log(error);
   }
}


export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus};
