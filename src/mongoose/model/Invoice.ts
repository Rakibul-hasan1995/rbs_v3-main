import { InvoiceRaw } from '@/types/invoice';
import mongoose, { Model, Schema } from 'mongoose';



type InvoiceDocument = InvoiceRaw & mongoose.Document
const invoiceSchema = new Schema<InvoiceDocument>(
  {
    customer: {
      type: Schema.ObjectId,
      required: true,
      ref: 'User'
    },
    date: {
      type: Date,
      required: true
    },
    invoice_no: {
      type: String,
      required: true,
      unique: true
    },
    customer_bill_no: {
      type: Number,
      required: true
    },
    discount: Number,
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: 'Created'
    },
    customer_prev_deu: {
      type: Number,
      default: 0
    },
    cover_photo: {
      type: Schema.ObjectId,
      ref: 'Gallery'
    },
    items: [{
      type: Schema.ObjectId,
      ref: 'Order'
    }],
    remarks: String
  },
  {
    timestamps: true,
    id: true
  }
);
// userSchema.index({ email: 'text' });

const Invoice: Model<InvoiceDocument> = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);


export { Invoice };



