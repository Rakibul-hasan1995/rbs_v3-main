import { Schema } from "mongoose";

export type InvoiceRaw = {
   customer: Schema.Types.ObjectId;
   cover_photo: Schema.Types.ObjectId;
   date: Date;
   invoice_no: string;
   customer_bill_no: number;
   discount: number;
   amount: number;
   status: string;
   customer_prev_deu?: number;
   items: string[];
   remarks?: string;
}
