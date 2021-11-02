// import Dependencies
import { checkSchema } from "express-validator";

export default checkSchema({
  title: {
    in: ["body"],
    isString: true,
    errorMessage : "Title Must be a String",
    trim: true,
    isLength: {
      options: { min: 1, max: 70 },
      errorMessage: 'Title must be between 1 and 70 characters.',
    },
  },
  content: {
    in: ["body"],
    isString: true,
    errorMessage : "Content Must be a String",
    trim: true,
    isLength: {
      options: { min: 1, max: 500 },
      errorMessage: 'Content must be between 1 and 500 characters.',
    },
  },
  entities: {
      in: ['body'],
      trim: true,
      isLength:{
          options:{
              min:10
          },
          errorMessage: "Entities value minimum 10 character long."
      }
  },
  customer :{
      in:['body'],
      isString:true,
      errorMessage: "Invalid Input Data."
  },
  price:{
      in: ['body'],
      isNumeric: true,
      errorMessage: "Price must be Numeric."
  }
});
