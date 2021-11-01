// import dependecies
import mongoose from "mongoose";

const Schema  = mongoose.Schema ;

const companySchema = new Schema({
    name : {
        type : String,
        required: true
    },
    about: {
        type: String
    },
    workTypes :{
        type : String,
        required : true
    },
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
});

// export 
export default mongoose.model("Company", companySchema);