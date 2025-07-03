import mongoose from "mongoose";

const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://priyanshuraj7590:abcdefghijl@cluster0.og3gcxd.mongodb.net/food').then(()=>console.log("DB connected"));
}
export default connectDB; 
