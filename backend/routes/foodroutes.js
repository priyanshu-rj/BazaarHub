import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controller/foodcontroller.js";
import { storage } from "../utils/cloudinary.js"; // ✅ Import cloudinary storage

const upload = multer({ storage: storage }); // ✅ Create multer upload handler

const foodRouter = express.Router();


foodRouter.post("/add", upload.single("image"), addFood);


foodRouter.get("/list", listFood);


foodRouter.post("/remove", removeFood);

export default foodRouter;
