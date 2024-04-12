
import { Account } from "@DB/model/account";
import { Transaction } from "@DB/model/transaction";
import { _arrSum } from "@Lib/global/arrSum";
import generatePagination from "@Lib/global/generatePagination";
import { getQueryParams } from "@Lib/global/getQueryParams";
import { numberWithCommas } from "@Lib/global/numberFormater";
import { ApiResponse } from "@Types/api";
import moment from "moment"


export async function getExpenseByCategory(url: any) {
   try {
      const page = getQueryParams(url as string, 'page', 1);
      const limit = getQueryParams(url as string, 'limit', 100)
      const sortType = getQueryParams(url as string, 'sort_type', 'desc')
      const sortKey = getQueryParams(url as string, 'sort_key', 'account_name')
      const start_date = getQueryParams(url as string, 'start_date', moment().startOf('month').toISOString())
      const end_date = getQueryParams(url as string, 'end_date', moment().endOf('month').toISOString())
      const skip = (page - 1) * limit;

      const accounts = await Account.find({ account_type: 'Expense' })

      const ids = accounts.map((item) => { return item._id })

      const transactions = await Transaction.aggregate([
         {
            $match: {
               account_id: { $in: ids },
               date: {
                  $gte: new Date(start_date),
                  $lte: new Date(end_date)
               }
            },
         },
         {
            $group: {
               _id: '$account_id',
               amount: { $sum: '$credit_amount' },
            },
         },

      ]);

      const pp = transactions.reduce((result, item) => {
         result[item._id] = item.amount;
         return result;
      }, {});


      const total = _arrSum(transactions, 'amount')

      const trIds = transactions.map((item: any) => { return item._id })

      const acc = await Account.find({ _id: { $in: trIds } })
         .skip(skip)
         .limit(limit)
         .sort({ [sortKey]: sortType == 'desc' ? -1 : 1 })


      let data = acc.map((acc) => {
         return {
            _id: acc._id,
            account_name: acc.account_name,
            amount: pp[acc._id] || 0,
            amount_formatted: numberWithCommas(pp[acc._id] || 0)
         };
      });

      const count = await Account.countDocuments({ account_type: 'Expense' })
      const pagination = generatePagination(page, limit, count)

      const response: ApiResponse<any> = {
         code: 200,
         data: {
            data,
            total,
            total_formatted: numberWithCommas(total),
            dateRange: `From ${moment(start_date).format('DD MMM yyyy')} To ${moment(end_date).format('DD MMM yyyy')}`,
         },
         pagination,
         message: 'OK'
      }

      return response

   } catch (error) {
      throw error
   }
}

