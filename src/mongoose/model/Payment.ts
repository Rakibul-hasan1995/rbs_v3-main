import mongoose, { Schema, Model } from 'mongoose';
import { payment_modes } from './appConfig';
import { PaymentRaw } from '@/types/payment';



type PaymentDocument = PaymentRaw & mongoose.Document
const paymentSchema = new Schema<PaymentDocument>(
   {
      customer: {
         type: Schema.ObjectId,
         ref: 'User',
         required: true,
      },
      date: {
         type: Date,
         required: true
      },
      receipt_no: {
         type: String,
         required: true
      },
      invoice: {
         type: Schema.ObjectId,
         ref: 'invoice'
      },
      received_by: {
         type: String,
         default: 'Author'
      },
      amount: {
         type: Number,
         required: true
      },
      payment_mode: {
         type: String,
         enum: payment_modes,
         default: 'Cash'
      },
      customer_prev_deu: {
         type: Number,
         default: 0
      },
      description: {
         type: String,
         default: ''
      },
      cheque_info: {
         cheque_date: Date,
         bank_name: String,
         branch_name: String,
         cheque_no: String,
         image: String
      }
   },
   {
      timestamps: true,
      id: true
   }
);
// paymentSchema.index({ email: 'text' });
const Payment: Model<PaymentDocument> = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);



export { Payment };