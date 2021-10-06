// Import Dependencies
import bcrypt from "bcrypt";
import crypto from "crypto";
import express from "express";
// Import Internal Module 
import User from "../userModel.js";



const authRouter = express.Router();


authRouter.post("/register", async(req, res, next) =>{
    const { name , email, phone, password, confirmPassword , company} = req.body ; 

    if (!name || !email || !password || !confirmPassword || !phone) {
        return res.status(406).json("Invalid Input data");;
      }
    if(password !== confirmPassword){
        return res.status(406).json("Passwords do not match");
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
} ) 


// Export
export default authRouter ;