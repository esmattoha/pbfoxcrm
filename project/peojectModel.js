import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create project schema
const projectSchema = new Schema(
  {
    customer: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);
