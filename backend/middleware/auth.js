import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next) =>{
     const {token} = req.headers;
     if(!token){
        return res.json({success:false,message:"not auth. login again"})
     }
     try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
     } catch (error) {
        console.log(error)
     }

}
//token genrate krne k liye pk
export default authMiddleware;
