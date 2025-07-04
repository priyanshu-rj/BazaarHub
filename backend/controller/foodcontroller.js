import foodModel from "../models/foodmodel.js";

// ✅ Add Food Controller
const addFood = async (req, res) => {
   try {
      console.log("Form Data:", req.body);
      console.log("File Data:", req.file);

      const food = new foodModel({
         name: req.body.name,
         description: req.body.description,
         price: req.body.price,
         category: req.body.category,
         image: req.file?.path || ""  // ✅ Cloudinary image URL
      });

      await food.save();
      res.json({ success: true, message: "Food Added" });
   } catch (error) {
      console.error("Error adding food:", error);
      res.json({ success: false, message: "Error" });
   }
};

// ✅ Get All Food Items
const listFood = async (req, res) => {
   try {
      const foods = await foodModel.find({});
      res.json({ success: true, data: foods });
   } catch (error) {
      console.error("Error listing food:", error);
      res.json({ success: false, message: "Error fetching food" });
   }
};

// ✅ Remove Food Item
const removeFood = async (req, res) => {
   try {
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food removed" });
   } catch (error) {
      console.error("Error removing food:", error);
      res.json({ success: false, message: "Error deleting food" });
   }
};

export { addFood, listFood, removeFood };
