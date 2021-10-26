 // Import Dependencies
import bcrypt from "bcrypt";
import crypto from "crypto";
import express from "express";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";
import signedAccessToken from "../../utils/jwtHelper.js";
import User from "../userModel.js";
import sendEmail from "./../../utils/email.js";



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
      
      await sendEmail({
        email: user.email,
        subject : "Login successfull",
        text: "Login successfull"
      });
      
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

authRouter.post("/forget-password", catchAsync(async(req, res, next)=>{
  const { email } = req.body;

  if (!email) {
    return next(
      new AppError(
        "Email address is empty, Please enter an email address.",
        406
      )
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(
      new AppError("The email does not exists in our database.", 404)
    );
  }

  // Create reset password token
  const token = crypto.randomBytes(16).toString("hex");

  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  user.reset_token = hashToken;
  user.reset_expiring_at = Date.now() + 1000*60*60;  

  await user.save();

  // Send Email to user
  await sendEmail({
    email:user.email,
    subject: "password Reset",
    text:token
  })
 
  res.status(200).json({
    status: "success",
    message: "We have send an email for verificarion. Please verify your email",
  });
}));

authRouter.post("/set-new-password/:token",catchAsync(async(req, res, next)=>{
  const { password, confirmPassword } = req.body;
  const { token } = req.params;

  if (!password || !confirmPassword) {
    return next(new AppError("Invalid data Input", 406));
  }

  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    reset_token: hashToken,
    reset_expiring_at: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("The link has expired", 404));
  }

  // Password Encryption
  const hashPassword = await bcrypt.hash(password, 12);

  user.password = hashPassword;
  user.reset_token = null;
  user.reset_expiring_at = null;

  await user.save();

  await sendEmail({
    email: user.email,
    subject: "Woho 🎉 Your password has been updated",
    text:"Woho 🎉 Your password has been updated",
  })
  
  res.status(200).json({
    status: "success",
    message: "Password has been updated",
  });
}))

// Export
export default authRouter ;