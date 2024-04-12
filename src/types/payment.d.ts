import { payment_modes } from "@/mongoose/model/appConfig";
import { Schema } from "mongoose";

export type PaymentRaw = {
   customer: Schema.Types.ObjectId;
   date: Date;
   receipt_no: string;
   invoice?: Schema.Types.ObjectId;
   received_by?: string;
   amount: number;
   payment_mode: typeof payment_modes[number];
   customer_prev_deu: number;
   description?: string;
   cheque_info?: {
      cheque_date?: Date;
      bank_name: string;
      branch_name: string;
      cheque_no: string;
      image?: string
   };
}


export type PaymentFormatted = {
   _id: string;
   customer: {
      _id: string;
      name: string
   };
   date: string;
   date_formatted: string;
   receipt_no: string;
   invoice?: string;
   received_by?: string;
   amount: number;
   amount_formatted: string;
   payment_mode: typeof payment_modes[number];
   customer_prev_deu?: number;
   description?: string;
   cheque_info?: {
      cheque_date?: string;
      bank_name: string;
      branch_name: string;
      cheque_no: string;
      image?: string
   };
}



export type paymentsQueryParams = {
   search?: string;
   search_by?: string;
   page?: string;
   limit?: string;
   sort_type?: string;
   sort_key?: string;
   start_date?: string;
   end_date?: string;
}
