import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create project schema
const projectSchema = new Schema(
  {
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  entities: [
    {
      type: String,
    },
  ],
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Customer is required'],
  },
  currency: {
    type: String,
    enum: ['INR', 'USD'],
    required: [true, 'Currency is required'],
    default: 'USD',
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  due_amount: {
    type: Number,
  },
  starting_date: {
    type: Date,
  },
  delivery_at: {
    type: Date,
  },
  delivered_at: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['processing', 'delivered', 'canceled'],
    default: 'processing',
  },
},
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);
