
import mongoose from "mongoose";
import moment from "moment";
import { getQueryParams } from "@Lib/global/getQueryParams";
import { Account } from "@DB/model/account";
import { getAccountClosingAmount } from "@Lib/accounts/getAccountClosingAmount";
import { TransactionRaw, TransactionsApiResponse } from "@Types/transaction";
import { getAccountTotalDebitCreditBalanceRow } from '@Lib/accounts/getAccountTotalDebitCreditBalanceRow';
import { getAccountOpeningBalanceRow } from '@Lib/accounts/getAccountOpeningBalanceRow';
import { getAccountClosingBalanceRow } from '@Lib/accounts/getAccountClosingAmountRow';
import { queryTransactions } from "@Lib/transactions/queryTransactions";
import "@DB/model/User";
import { ApiResponse } from "@Types/api";
import { numberWithCommas } from "@Lib/global/numberFormater";

export const getAccountById = async (url: any, id: string) => {
   try {

      const page = getQueryParams(url as string, 'page', 1);
      const limit = getQueryParams(url as string, 'limit', 5)
      const sortType = getQueryParams(url as string, 'sort_type', 'desc')
      const sortKey = getQueryParams(url as string, 'sort_key', 'createdAt')
      const start_date = getQueryParams(url as string, 'start_date', moment().startOf('month').format('yyyy-MM-DD'))
      const end_date = getQueryParams(url as string, 'end_date', moment().endOf('month').format('yyyy-MM-DD'))
      const expand = getQueryParams(url as string, 'expand', 'false')

      const account: any = await Account.findById(id)
         .populate('createdBy', 'user_name roll')
         .exec()

      if (!account) {
         throw new Error("Resource not found", { cause: 404 })
      }



      let data = { ...account?._doc }
      const closingBalance = await getAccountClosingAmount(data._id)
      const closing_balance = account.account_type == 'Income' ? -closingBalance : closingBalance
      data.closing_balance = closing_balance
      data.closing_balance_formatted = numberWithCommas(closing_balance)
      const transactionFilter: mongoose.FilterQuery<TransactionRaw> = {
         account_id: data._id
      }
      if (start_date && end_date) {
         transactionFilter.date = {
            $gte: moment(start_date).startOf('D').toISOString(),
            $lte: moment(end_date).endOf('D').toISOString(),
         }
      }

      const { data: transactions, pagination } = await queryTransactions({
         page,
         limit,
         sortType,
         sortKey,
         filter: transactionFilter
      })

      if (!expand) {
         data.transactions = transactions

         const res: ApiResponse<TransactionsApiResponse> = {
            code: 200,
            data: data,
            message: 'OK'
         }
         return res
      }


      const totalDCRow = await getAccountTotalDebitCreditBalanceRow({ accountId: data._id, endDate: end_date, startDate: start_date, isDebit: data.isDebit })
      transactions.push(totalDCRow)

      const openingBalanceRow = await getAccountOpeningBalanceRow({ accountId: data._id, startDate: start_date, isDebit: data.isDebit })
      transactions.unshift(openingBalanceRow)

      const closingBalanceRow = await getAccountClosingBalanceRow({ accountId: data._id, endDate: end_date, startDate: start_date })
      transactions.push(closingBalanceRow)



      if (start_date && end_date) {
         data.dateRange = `From ${moment(start_date).format('DD MMM yyyy')} To ${moment(end_date).format('DD MMM yyyy')}`
      }
      data = { ...data, transactions }

      const res: ApiResponse<any> = {
         code: 200,
         data: data,
         message: 'OK',
         pagination
      }
      return res
   } catch (error: any) {
      throw error
   }
}

