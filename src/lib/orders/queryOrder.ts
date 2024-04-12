import { DeliveryChallan, ReceiveChallan } from "@DB/model/Challan";
import { Order, OrderDocument } from "@DB/model/Order";
import { Production } from "@DB/model/Production";
import generatePagination from "@Lib/global/generatePagination";
import { FilterQuery } from "mongoose";
import "@DB/model/Gallery";
import { ApiResponse } from "@Types/api";
import { numberWithCommas } from "@Lib/global/numberFormater";
type QueryParams = {
   page?: number;
   limit?: number;
   sort_type?: "desc" | 'asc';
   sort_key?: string;
   expand?: boolean;
   query?: FilterQuery<OrderDocument>
}

export const queryOrder = async (params: QueryParams) => {
   try {
      const { page = 1, limit = 10, sort_key = '_id', sort_type = 'desc', expand = false, query = {} } = params

      const skip = (page - 1) * limit;

      const orders = Order.find(query)
         .skip(skip)
         .limit(limit)
         .sort({ [sort_key]: sort_type })
         .populate('cover_photo', 'href')
         .populate('customer', 'user_name exchange_rate')
         .select('-image_gallery -tags -__v -shipment_date -createdAt -updatedAt')

      let data: any
      let recData: { [x: string]: any; }
      let delData: { [x: string]: any; }
      let prodData: { [x: string]: any; }


      if (expand) {
         data = (await orders.exec()).filter(order => order.customer)
         const orderIds = data.map((item: any) => item._id)

         //  generate Rec Qty ======>
         const recChalan = await ReceiveChallan.aggregate([
            {
               $unwind: '$items',
            },
            {
               $match: {
                  'items.order': { $in: orderIds }, // Define orderIds as an array of order IDs to be queried
               },
            },
            {
               $group: {
                  _id: '$items.order',
                  receive_qty: { $sum: '$items.qty' },
               },
            },
         ]);

         recData = recChalan.reduce((result, item) => {
            result[item._id] = item.receive_qty;
            return result;
         }, {});
         //  generate Rec Qty <======

         //  generate Delivery Qty ======>
         const delChalan = await DeliveryChallan.aggregate([
            {
               $unwind: '$items',
            },
            {
               $match: {
                  'items.order': { $in: orderIds }, // Define orderIds as an array of order IDs to be queried
               },
            },
            {
               $group: {
                  _id: '$items.order',
                  delivery_qty: {
                     $sum: {
                        $add: [
                           '$items.qty',
                           '$items.emb_reject_qty',
                           '$items.fabric_reject_qty',
                        ],
                     }
                  },
               },
            },
         ]);

         delData = delChalan.reduce((result, item) => {
            result[item._id] = item.delivery_qty;
            return result;
         }, {});
         //  generate Delivery Qty <======

         //  generate Delivery Qty ======>
         const production = await Production.aggregate([
            {
               $unwind: '$production_data',
            },
            {
               $match: {
                  'production_data.order': { $in: orderIds }, // Define orderIds as an array of order IDs to be queried
               },
            },
            {
               $group: {
                  _id: '$production_data.order',
                  production_qty: { $sum: '$production_data.qty' },
               },
            },
         ]);

         prodData = production.reduce((result, item) => {
            result[item._id] = item.production_qty;
            return result;
         }, {});
         //  generate Delivery Qty <======


         data = data.map((order: any) => {
            const orderData = { ...order.toObject() };
            return {
               ...orderData,
               rate_formatted: `${order.currency == 'BDT'? "BDT": "USD"} ${numberWithCommas(orderData.rate) }`,
               receive_qty: recData[order._id] || 0,
               delivery_qty: delData[order._id] || 0,
               production_qty: prodData[order._id] || 0
            };
         });

      } else {
         data = (await orders.exec()).filter(order => order.customer)
      }

      // const count = data.length
      const count = await Order.countDocuments(query)
      const pagination = generatePagination(page, limit, count)

      const response: ApiResponse<any> = {
         code: 200,
         message: "Ok",
         data,
         pagination
      };

      return response
   } catch (error: any) {
      throw error
   }
};
