import { Transaction } from "@DB/model/transaction"
import { _arrSum } from "@Lib/global/arrSum"
import { numberWithCommas } from "@Lib/global/numberFormater"
import { ApiResponse } from "@Types/api"
import { CustomerStatement, CustomerStatementRow } from "@Types/customer"
import { TransactionRaw } from "@Types/transaction"
import moment from "moment"
import mongoose from "mongoose"
const getCustomerStatement = async (id: string) => {
   try {

      // // find transactions for this customer==========>>>>
      // const transactions: TransactionRaw[] = await Transaction.find({ customer_id: new mongoose.Types.ObjectId(id) })
      //    .lean()
      // // find transactions for this customer==========<<<<



      // find transactions for this customer==========>>>>

      const transactions = await Transaction.find({
         $or: [
            {
               $and: [
                  { type: 'Customer Payment' },
                  { debit_amount: { $gt: 0 } }
               ]
            },
            {
               $and: [
                  { type: 'Invoice' },
                  { credit_amount: { $gt: 0 } }
               ]
            }
         ],
         customer_id: new mongoose.Types.ObjectId(id)
      });

      // find transactions for this customer==========<<<<



      // formatting row data =============>>>
      const row: CustomerStatementRow[] = transactions.map((item) => (
         {
            date: item.date,
            date_formatted: moment(item.date).format('DD MMM yyyy'),
            credit_amount: item.credit_amount || 0,
            credit_amount_formatted: numberWithCommas(item.credit_amount) || "",
            debit_amount: item.debit_amount || 0,
            debit_amount_formatted: numberWithCommas(item.debit_amount) || '',
            descriptions: item.description || '',
            page: item.reference || 'ref'
         }))

      // formatting row data =============<<<


      // calculating total amounts =============>>>
      // this _arrSum is a helper function 
      const total_credit_amount = _arrSum(row, 'credit_amount') || 0
      const total_debit_amount = _arrSum(row, 'debit_amount') || 0
      const closing_amount = total_credit_amount - total_debit_amount
      // calculating total amounts =============<<<


      // final structure =========>>>
      const data: CustomerStatement = {
         transactions: row,
         customer_name: 'xyz',
         total_credit_amount,
         total_debit_amount,
         total_credit_amount_formatted: numberWithCommas(total_credit_amount),
         total_debit_amount_formatted: numberWithCommas(total_debit_amount),
         closing_amount,
         closing_amount_formatted: numberWithCommas(closing_amount)
      }
      // final structure =========<<<

      // make response =========>>>
      const res: ApiResponse<CustomerStatement> = {
         code: 200,
         data: data,
         message: "Ok"
      }

      return res
   } catch (error) {
      throw error
   }
}


export default getCustomerStatement