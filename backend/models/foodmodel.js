import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String,require:true},
    description: {type:String,require:true},
    price: {type:Number,require:true},
    image: {type:String,require:true},
    category: {type:String,require:true}
});

const foodModel = mongoose.model("foodmodel",foodSchema);

export default foodModel;
