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
  workTypes :{
      in:['body'],
      isString:true,
      errorMessage: "Invalid Input Data.",
      isLength:{
        options:{
            min:10,
        },
        errorMessage: "Work type should be atleast 10 characters long."
    }
  },
  admin: {
    in:['body'],
    isString:true,
    errorMessage: "Invalid Input Data.",
    isLength:{
        options:{
            min:3,
        },
        errorMessage: "Work type should be atleast 3 characters long."
    }
  }
});
