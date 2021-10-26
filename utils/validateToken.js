/**
 * @param String token
 * @return String userId || boolean
 */
import env from "dotenv";
import jwt from "jsonwebtoken";

env.config();


 const validateToken = (token) => {
   return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
     if (err) {
       return false;
     }
     return decoded.id;
   });
 };
 
 // export
 export default validateToken ;