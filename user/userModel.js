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
      type: String
    },
    password: {
      type: String,
      required: true ,
      select: false,
    },
    oAuth:{
      google_id : String,
      github_id: String
    },
    company: {
      type: String,
    },
    address:[ {
      addressLine1: {
        type: String,
        trim: true,
      },
      addressLine2: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
      },
      state:{
        type: String
      },
      city: {
        type: String,
      },
      zipcode: {
        type: Number,
      },
    }],
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