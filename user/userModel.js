import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Create user schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: [true, 'Email address is already in use'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    password: {
      type: String,
      select: false,
    },
    company: {
      type: String,
    },
    address: {
      address_line1: {
        type: String,
        trim: true,
      },
      address_line2: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      zipcode: {
        type: Number,
      },
    },
    role: {
      type: String,
      enum: ['user', 'manager', 'admin'],
      default: 'user',
    },
    verification_token: {
      type: String,
    },
    verification_expiring_at: {
      type: Date,
    },
    reset_token: {
      type: String,
    },
    reset_expiring_at: {
      type: Date,
    },
  },
  {
    timestamps: true
  }
);

UserSchema.index({ email: 1 });

export default mongoose.model('User', UserSchema);