import { orderStatus } from "@/mongoose/model/appConfig";
import { Schema } from "mongoose";

type Status = typeof orderStatus[number];


export type OrderQueryParams = {
   search?: string;
   search_by?: string;
   filter_key?: string;
   filter_value?: string
   page?: string;
   limit?: string;
   sort_type?: string;
   sort_key?: string;
   expand?: 'true' | 'false',
   status?: string
}



export type OrderRaw = {
   _id: string
   customer: Schema.Types.ObjectId;
   order_name: string;
   program_name?: string;
   qty: number;
   rate: number;
   currency: string;
   unit: string;
   stitching?: number;
   category?: string;
   tags?: string[];
   description?: string;
   order_date?: string;
   shipment_date?: string;
   status: Status;
   image_gallery?: Schema.Types.ObjectId[];
   cover_photo: Schema.Types.ObjectId;
}
export type Orders = {
   _id: string;
   customer: {
      _id: string;
      exchange_rate: number;
      user_name: string;
   };
   order_name: string;
   program_name?: string;
   qty: number;
   rate: number;
   rate_formatted: string;
   currency: string;
   unit: string;
   stitching?: number;
   category?: string;
   description?: string;
   order_date?: string;
   status: Status;
   cover_photo: {
      _id: string;
      href: string
   }
}
export type OrdersExpand = Orders & {
   receive_qty: number;
   delivery_qty: number;
   production_qty: number
}



type orderUpdateBody = {
   ids: string[];
   update: {
      status?: string;
      qty?: string
   }
}