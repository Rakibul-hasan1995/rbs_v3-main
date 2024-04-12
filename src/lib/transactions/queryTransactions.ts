

import mongoose from "mongoose";
import { Transaction } from "../../mongoose/model/transaction";

import moment from "moment";

import "../../mongoose/model/account";
import "../../mongoose/model/User";
import { TransactionFormatted, TransactionRaw } from "@Types/transaction";
import generatePagination from "@Lib/global/generatePagination";
import { numberWithCommas } from "@Lib/global/numberFormater";

type Query = {
   limit?: number;
   sortKey?: string;
   sortType?: string;
   page?: number;
   filter: mongoose.FilterQuery<TransactionRaw>
};

type Response = {
   data: TransactionFormatted[];
   pagination: any
}


type QueryTransactions = (arg: Query) => Promise<Response>


export const queryTransactions: QueryTransactions = async (query) => {
   try {
      let { limit = 100, page = 1, sortKey, sortType } = query;

      const skip = (+page - 1) * limit;

      // Execute the query with optional sorting and pagination
      let transactions: TransactionFormatted[] = await Transaction.find(query.filter)
         .limit(limit)
         .populate('account_id', 'account_name')
         .populate('paid_from_account', 'account_name')
         .populate('paid_to_account', 'account_name')
         .populate('supplier_id', 'user_name')
         .populate('customer_id', 'user_name')
         .skip(skip)
         .sort({ [sortKey || 'createdAt']: sortType == 'desc' ? 1 : -1 })
         .lean(); // Convert Mongoose documents to plain JavaScript objects


      transactions = transactions.map((item) => (transactionFormatter(item)))

      const count = await Transaction.countDocuments(query.filter)
      const pagination = generatePagination(page, limit, count)

      return {
         data: transactions,
         pagination
      };
   } catch (error) {
      throw error;
   }
};



export const transactionFormatter = (item: any): TransactionFormatted => {
   const formateData: TransactionFormatted = {
      ...item,
      transaction_details: transactionDetailsFinder(item),
         // item.transaction_details ?
         //    item.transaction_details :
         //    `${item.paid_to_account?.account_name},
         //        ${item.customer_id?.user_name ? `Customer: ${item.customer_id.user_name}` : ""} 
         //        ${item.supplier_id?.user_name ? `Supplier: ${item.supplier_id.user_name}` : ""} 
         //        `,
      date_formatted: moment(item.date).format('DD MMM YYYY'),
      debit_amount_formatted: numberWithCommas(item.debit_amount),
      credit_amount_formatted: numberWithCommas(item.credit_amount),

      // debit_amount_formatted: item.debit_amount ? numberWithCommas(item.debit_amount) : "",
      // credit_amount_formatted: item.credit_amount ? numberWithCommas(item.credit_amount) : "",

   }
   return formateData
}


const customerAcc = ['Settlement', 'Invoice', 'Customer Payment']


const transactionDetailsFinder = (item: TransactionFormatted) => {

   if (item.type == 'Opening Balance') {
      return "Opening Balance"
   }

   if (customerAcc.includes(item.type || "")) {
      return item.customer_id?.user_name
   }
   if (item.type == 'Expense' || item.type == 'Purchases') {
      return [item.paid_to_account.account_name, `,  ${item.supplier_id?.user_name ? `Supplier: ${item.supplier_id.user_name}` : ''}`]
   }

   return item.transaction_details


}