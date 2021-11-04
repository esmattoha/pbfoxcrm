// Import Dependencies
import env from "dotenv";
import express from "express";
import mongoose from "mongoose";
import companyRoute from "./company/companyRoute.js";
import gitubOAuthRoute from "./oAuth/githubOAuth/githubOAuthRoute.js";
import googleOAuthRoute from "./oAuth/google/googleOAuthRoute.js";
import projectRoute from "./project/projectRoute.js";
import authRoute from "./user/auth/authRoute.js";
import userRoute from "./user/user/userRoute.js";
import AppError from "./utils/appError.js";
import catchAsync from "./utils/catchAsync.js";

const app = express();
env.config();  // env configuration


// DataBase Connection
try {
  (async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("You are Successfully connected with Database.");
  })();
} catch (error) {
  console.log(error);
  process.exit(1);
}

// JSON Parser
app.use(express.json());

//router
app.use("/api/v2/auth", authRoute);
app.use("/api/v2/", userRoute);
app.use("/api/v2", googleOAuthRoute);
app.use("/api/v2", gitubOAuthRoute);
app.use("/api/v2", companyRoute);
app.use("/api/v2/project", projectRoute);


// 404 Error Handling 
app.all("*" , catchAsync(async(req, res, next ) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}));


// Export
export default app;
