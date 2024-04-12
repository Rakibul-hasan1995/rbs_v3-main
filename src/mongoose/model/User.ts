import mongoose, { Schema, Model } from 'mongoose';
import { userRolls } from './appConfig';
import { CustomerRaw } from '@/types/customer';


export type UserDocument = CustomerRaw & mongoose.Document

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    user_name: {
      type: String,
      required: true
    },
    roll: {
      type: String,
      enum: userRolls,
      default: 'customer',
    },
    opening_balance: {
      type: Number,
    },
    password: String,
    contact_details: {
      address: String,
      phone: String,
      contactParsonName: String
    },
    exchange_rate: {
      type: Number,
      default: 85
    },
    status: {
      type: String,
      default: 'Pending'
    }
  },
  {
    timestamps: true,
    id: true
  }
);

// mongoose.deleteModel('User');
// userSchema.index({ email: 'text' });
const User: Model<UserDocument> = mongoose.models.User || mongoose.model('User', userSchema);



export { User };