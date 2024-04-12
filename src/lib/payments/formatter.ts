import { numberWithCommas } from "@Lib/global/numberFormater"
import { PaymentFormatted } from "@Types/payment"
import moment from "moment"

const paymentFormatter = (item: any)=>{

const payment: PaymentFormatted = {
   ...item,
   amount_formatted: numberWithCommas(item.amount),
   date_formatted: moment(item.date).format('DD MMM YYYY'),
   customer: {
      _id: item.customer._id,
      name: item.customer.user_name
   }
}

   // const payment: PaymentFormatted[] = data.map((item: any) => ({
   //    ...item,
   //    amount_formatted: numberWithCommas(item.amount),
   //    date_formatted: moment(item.date).format('DD MMM YYYY'),
   //    customer: {
   //       _id: item.customer._id,
   //       name: item.customer.user_name
   //    }
   // }))
   return payment

}

export {paymentFormatter}