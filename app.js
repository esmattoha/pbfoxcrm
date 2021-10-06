// Import Dependencies
import env from "dotenv";
import express from "express";
import mongoose from "mongoose";
// Import Internal Module
import authRoute from "./user/auth/authRoute.js";


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

app.use("/api/v2/auth", authRoute);

// Export
export default app;
