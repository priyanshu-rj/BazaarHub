import express from "express";
import { addFood, listFood, removeFood } from "../controller/foodcontroller.js";
import multer from "multer";
import { storage } from "../utils/cloudinary.js"; // ✅ import Cloudinary storage

const upload = multer({ storage }); // ✅ use Cloudinary

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
