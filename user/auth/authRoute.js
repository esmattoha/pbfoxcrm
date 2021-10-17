// Import Dependencies
import bcrypt from "bcrypt";
import crypto from "crypto";
import express from "express";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";
import signedAccessToken from "../../utils/jwtHelper.js";
import User from "../userModel.js";



const authRouter = express.Router();

authRouter.post("/login", catchAsync(async(req, res, next)=>{
    const { email, password } = req.body ; 

    if ( !email || !password ) {
        return next(new AppError("Invalid Input Data.", 406));
      }

      const user = await User.findOne({email : email}).select("+password");

      if(!user){
        return next(new AppError("Invalid email or Password.", 406));
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return next(new AppError("Invalid email or Password.", 406));
      }

      const token = await signedAccessToken(user._id, user.email);
      
      res.status(200).json({
          status: "success",
          token : token ,
          data : {
              _id : user._id,
              email: user.email,
              type : user.role
          }
      })
}))

authRouter.post("/register", catchAsync(async(req, res, next) =>{
    const { name , email, phone, password, confirmPassword , company} = req.body ; 

    if (!name || !email || !password || !confirmPassword || !phone && (password !== confirmPassword)) {
        return next(new AppError("Invalid Input Data.", 406));
      }

    const varificationToken =  crypto.randomBytes(32).toString('hex');
    const encryptedVarificationToken = crypto
    .createHash('sha256')
    .update(varificationToken)
    .digest('hex');

    const user = await User.create({
        name,
        email,
        phone,
        company,
        password : await bcrypt.hash(password, 12),
        verification_token : encryptedVarificationToken,
        verification_expiring_at : Date.now() + 10 * 60 * 60 * 1000
    });
    
    res.status(201).json({
        status: 'success',
        data: user,
      });
}) ) 



// Export
export default authRouter ;