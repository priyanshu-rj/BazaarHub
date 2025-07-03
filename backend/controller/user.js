import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'

//login
const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        
        if(!user){
            return res.json({success:false,message:"user doesn't exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
           return res.json({success:false,message:"invalid password"})
        }
        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//signup
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        const exists = await userModel.findOne({email});
        if(exists){
           return res.json({success:false,message:"user already exists "})
        }
//valid email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter Valid Email"})
        }
    if(password.length<5){
        return res.json({success:false,message:"please insert Strong password"})
    }

    //hashing user paswword bycrypt

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })
    
    const user = await newUser.save()
    const token = createToken(user._id);
    res.json({success:true,token});
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})  
    }
}

export {loginUser,registerUser}