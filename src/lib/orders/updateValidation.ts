

import { isValidObjectId } from "mongoose"
import { orderStatus } from "../../mongoose/model/appConfig";
import { OrderRaw } from "@Types/order";





const updateOrderValidation = (data: Partial<OrderRaw>) => {
   let error: any = {}
   let updates: Partial<OrderRaw> = {}

   if (data.customer) {
      if (!isValidObjectId(data.customer)) {
         error.customer = '! customer is not valid'
      } else {
         updates.customer = data.customer
      }
   }
   if (data.order_name) {
      if (data.order_name.length <= 3) {
         error.order_name = '! order name is too short'
      } else if (data.order_name.length >= 20) {
         error.order_name = '! order name is too long'
      } else {
         updates.order_name = data.order_name
      }
   }
   if (data.qty) {
      if (data.qty <= 0) {
         error.qty = `! order qty "${data.qty}" not accepted`
      } else {
         updates.qty = data.qty
      }
   }
   if (data.rate) {
      if (data.rate >= 0) {
         error.rate = `! order rate "${data.rate}" not accepted`
      } else {
         updates.rate = data.rate
      }
   }
   if (data.currency) {
      if (data.currency !== 'BDT' || 'USD') {
         error.currency = `! order currency "${data.currency}" not accepted`
      } else {
         updates.currency = data.currency
      }
   }
   if (data.stitching) {
      updates.stitching = data.stitching
   }
   if (data.tags) {
      updates.tags = data.tags
   }
   if ('description' in data) {
      updates.description = data.description
   }

   if (data.order_date) {
      updates.order_date = data.order_date
   }
   if ('shipment_date' in data) {
      updates.shipment_date = data.shipment_date
   }
   if ('status' in data) {
      updates.status = data.status
      const x = orderStatus.find((item) => item == data.status)
      if (!x?.length) {
         error.status = `! order status "${data.status}" not accepted`
      }
   }
   if ('image_gallery' in data) {
      updates.image_gallery = data.image_gallery
   }
   if ('cover_photo' in data) {
      updates.cover_photo = data.cover_photo
   }
   return {
      error,
      isValid: Object.keys(error).length === 0,
      updates
   };
};

export default updateOrderValidation;
