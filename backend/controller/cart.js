import userModel from '../models/userModel.js'

//add to cart 
const addToCart = async (req,res) =>{
     try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"added to cart"})
     } catch (error) {
        console.log(error);
     }
}

//remove item from cart

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData;
        if (!cartData || !cartData[req.body.itemId]) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        } else {
            return res.status(400).json({ success: false, message: "Item quantity is already zero" });
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

//fetch user cart data

const getCart = async(req,res) => {
     try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
     } catch (error) {
        console.log(error)
     }
}

export {addToCart,removeFromCart,getCart}