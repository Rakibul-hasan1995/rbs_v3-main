import mongoose, { Schema, Model } from 'mongoose';
import { currency, itemUnits, orderCategory, orderStatus } from './appConfig';
import { OrderRaw } from '@/types/order';




export type OrderDocument = OrderRaw & mongoose.Document

const orderSchema = new Schema<OrderDocument>(
  {
    customer: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    order_name: {
      type: String,
      required: true
    },
    program_name: {
      type: String,
      default: ''
    },
    qty: {
      type: Number,
      default: 0
    },
    rate: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      enum: currency,
      default: 'BDT'
    },
    unit: {
      type: String,
      enum: itemUnits,
      default: 'Pcs'
    },
    stitching: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      enum: orderCategory,
      default: 't-shirt'
    },
    tags: {
      type: [String],
      default: 'Design'
    },
    status: {
      type: String,
      default: 'placed'
    },
    description: String,
    order_date: {
      type: Date,
      default: new Date()
    },
    shipment_date: {
      type: Date,
      default: new Date()
    },
    image_gallery: [{ type: Schema.ObjectId, ref: 'Gallery' }],
    cover_photo: {
      type: Schema.ObjectId,
      ref: 'Gallery'
    }
  },
  {
    timestamps: true,
    id: true
  }
);
// orderSchema.index({ email: 'text' });

const Order: Model<OrderDocument> = mongoose.models.Order || mongoose.model('Order', orderSchema);


export { Order };