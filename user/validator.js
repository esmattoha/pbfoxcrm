// import Dependencies
import { checkSchema } from "express-validator";

export default checkSchema({
  name: {
    in: ["body"],
    isString: true,
    errorMessage : "Name Must be a String",
    trim: true,
    isLength: {
      options: { min: 1, max: 70 },
      errorMessage: 'Name must be between 1 and 70 characters.',
    },
  },
  email: {
    in: ["body"],
    isString: true,
    isEmail: true,
    errorMessage : "Invalid Email.",
    trim: true
  },
  phone: {
      in: ['body'],
      trim: true,
      isString: true ,
      isLength:{
          options:{
              min:6
          },
          errorMessage: "phone number atleast 6 digits long."
      }
  },
  password :{
      in:['body'],
      isString:true,
      errorMessage: "Invalid Input Data.",
      isLength:{
        options:{
            min:6,
            max: 14
        },
        errorMessage: "Password must be between 6 to 14 characters long."
    }
  }
});
