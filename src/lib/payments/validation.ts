import { payment_modes } from "@DB/model/appConfig";
import { PaymentRaw } from "@Types/payment";
import { isValidObjectId } from "mongoose";

const paymentValidation = (data: Partial<PaymentRaw>) => {
   let error: any = {}

   if (!data.date) {
      error.date = '! this field is required'
   }
   if (!data.receipt_no) {
      error.receipt_no = '! this field is required'
   }
   if (!data.customer) {
      error.customer = '! this field is required'
   } else if (!isValidObjectId(data.customer)) {
      error.customer = '! invalid customer data'
   }
   if (!payment_modes.includes(data.payment_mode || "")) {
      error.payment_mode = '! this field is required'
   }



   if (!data.amount) {
      error.amount = '! amount is required'
   } else if (data.amount < 0) {
      error.amount = `! amount "${data.amount}" not accepted`
   }

   return {
      error,
      isValid: Object.keys(error).length === 0,
   };
};

export default paymentValidation;
