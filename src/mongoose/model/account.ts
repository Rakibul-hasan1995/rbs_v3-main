import { AccountRaw } from '@Types/account';
import mongoose, { Schema, Model } from 'mongoose';



type AccDocument = AccountRaw & mongoose.Document
const schema = new Schema<AccDocument>(
  {
    account_name: {
      type: String,
      required: true
    },
    account_type: {
      type: String,
      enum: ['Expense', 'Income', 'Liability', "Asset","Loss"],
      required: true,
    },
    is_system_account: {
      type: Boolean,
      required: true,
      default: false
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true
    },
    description: {
      type: String,
      required: false
    },
    is_debit: {
      type: Boolean,
      required: true,
      default: true
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true,
    id: true
  }
);
// userSchema.index({ email: 'text' });
const Account: Model<AccDocument> = mongoose.models.Account || mongoose.model<AccDocument>('Account', schema);


export { Account };



