import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the TypeScript interface for the item within items array
interface Item {
  _id: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  qty: number;
  emb_reject_qty: number;
  fabric_reject_qty: number;
  remarks: string;
}

export interface ChallanDocument extends Document {
  date: Date;
  challan_no: string;
  customer: mongoose.Types.ObjectId;
  bag_qty: number;
  remarks: string;
  items: Item[];
}

const itemSchema = new Schema<Item>(
  {
    order: {
      type: Schema.ObjectId,
      ref: "Order",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    emb_reject_qty: {
      type: Number,
      default: 0,
    },
    fabric_reject_qty: {
      type: Number,
      default: 0,
    },
    remarks: {
      type: String,
      required: false,
    },
  }, {
  _id: true
}
)


// Create a base Mongoose schema based on the TypeScript interface
const challanSchema = new Schema<ChallanDocument>({
  date: {
    type: Date,
    required: true,
  },
  customer: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  challan_no: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  bag_qty: {
    type: Number,
    required: false,
  },
  remarks: {
    type: String,
    required: false,
  },
  items: [itemSchema],
});

// Create Mongoose models for Receive_challan and Delivery_challan using the base schema


const ReceiveChallan: Model<ChallanDocument> = mongoose.models.Receive_challan || mongoose.model<ChallanDocument>('Receive_challan', challanSchema);
const DeliveryChallan: Model<ChallanDocument> = mongoose.models.Delivery_challan || mongoose.model<ChallanDocument>('Delivery_challan', challanSchema);


// const ReceiveChallan: Model<ChallanDocument> = mongoose.model('Receive_challan', challanSchema);
// const DeliveryChallan: Model<ChallanDocument> = mongoose.model('Delivery_challan', challanSchema);

// Export the models
export { ReceiveChallan, DeliveryChallan };
