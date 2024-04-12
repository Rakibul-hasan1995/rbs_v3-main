
import { getQueryParams } from "@Lib/global/getQueryParams";
import { queryTransactions } from "@Lib/transactions/queryTransactions";
import { ApiResponse } from "@Types/api";
import moment from "moment";

export const findExpense = async (url: any) => {
   try {
      const page = getQueryParams(url as string, 'page', 1);
      const limit = getQueryParams(url as string, 'limit', 10)
      const sortType = getQueryParams(url as string, 'sort_type', 'desc')
      const sortKey = getQueryParams(url as string, 'sort_key', 'createdAt')
      const start_date = getQueryParams(url as string, 'start_date', moment('2022').startOf('month').toISOString())
      const end_date = getQueryParams(url as string, 'end_date', moment().endOf('month').toISOString())

      let filter = {}
      if (start_date) {
         filter = { ...filter, date: { $gt: new Date(moment(start_date).startOf('D').toISOString()), $lt: new Date(moment(end_date).endOf('D').toISOString()) } }
      }
      filter = { ...filter, type: "Expense", debit_amount: { $gt: 0 } }

      const { data, pagination } = await queryTransactions({ page, limit, sortKey, sortType, filter })


      const response: ApiResponse<any> = {
         code: 200,
         data: {
            data,
            dateRange: `From ${moment(start_date).format('DD MMM yyyy')} To ${moment(end_date).format('DD MMM yyyy')}`
         },
         pagination,
         message: "Ok"
      };

      return response
   } catch (error: any) {
      throw error
   }
};

