/**
 *  Title : Project management Application
 *  Author : Dipu
 *  Date : 06.10.2021
 */

// Import Dependencies
import env from "dotenv";
// Import Internal Module 
import app from "./app.js";

// ENV Configuration
env.config();

const PORT = process.env.PORT || 4000 ;

// Server Listening
app.listen(PORT , (err)=>{
   if(err){
       console.log(err);
   }
   console.log(`Server running on Port ${PORT}`)
})