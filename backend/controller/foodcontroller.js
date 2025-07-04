import foodModel from "../models/foodmodel.js";

// ✅ Add Food Controller
const addFood = async (req, res) => {
   try {
      console.log("Form Data:", req.body);
      console.log("File Data:", req.file);

      if (!req.file?.path) {
         return res.status(400).json({ success: false, message: "Image upload failed" });
      }

      const food = new foodModel({
         name: req.body.name,
         description: req.body.description,
         price: req.body.price,
         category: req.body.category,
         image: req.file.path  // ✅ Cloudinary URL from multer-storage-cloudinary
      });

      await food.save();
      res.json({ success: true, message: "Food Added", data: food });
   } catch (error) {
      console.error("❌ Error adding food:", error);
      res.status(500).json({ success: false, message: "Error adding food" });
   }
};

// ✅ Get All Food Items
const listFood = async (req, res) => {
   try {
      const foods = await foodModel.find({});
      res.json({ success: true, data: foods });
   } catch (error) {
      console.error("❌ Error listing food:", error);
      res.status(500).json({ success: false, message: "Error fetching food" });
   }
};

// ✅ Remove Food Item
const removeFood = async (req, res) => {
   try {
      const result = await foodModel.findByIdAndDelete(req.body.id);
      if (!result) {
         return res.status(404).json({ success: false, message: "Food not found" });
      }

      res.json({ success: true, message: "Food removed" });
   } catch (error) {
      console.error("❌ Error removing food:", error);
      res.status(500).json({ success: false, message: "Error deleting food" });
   }
};

export { addFood, listFood, removeFood };
