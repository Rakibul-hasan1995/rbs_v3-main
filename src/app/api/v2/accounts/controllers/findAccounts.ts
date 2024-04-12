import { Account } from "@DB/model/account";
import generatePagination from "@Lib/global/generatePagination";
import { getQueryParams } from "@Lib/global/getQueryParams";
import { AccountRaw } from "@Types/account";
import { ApiResponse } from "@Types/api";

export const findAccounts = async (url: any,) => {
   try {
      const page = getQueryParams(url as string, 'page', 1);
      const limit = getQueryParams(url as string, 'limit', 10)
      const sortType = getQueryParams(url as string, 'sort_type', 'desc')
      const sortKey = getQueryParams(url as string, 'sort_key', 'invoice_no')
      const searchTerm = getQueryParams(url as string, 'search', undefined)
      const searchBy = getQueryParams(url as string, 'search_by', undefined)
      const type = getQueryParams(url as string, 'type', undefined) // "Cash" | 'Expenses' | 'Income' | 'Liability' | "Asset"

      const skip = (page - 1) * limit;

      const regex = new RegExp(searchTerm, 'i')
      let filter = {}
      if (searchBy && searchTerm) {
      filter = { [searchBy]: { $regex: regex } }
      }

      if (type) {
         filter = { ...filter, account_type: type }
         // filter = {account_type: type }
      }
      const account = await Account.find(filter)
         .skip(skip)
         .limit(limit)
         .sort({ [sortKey]: sortType == 'desc' ? 1 : -1 })
         .exec()

      const count = await Account.countDocuments(filter)
      const pagination = generatePagination(page, limit, count)
      const response: ApiResponse<AccountRaw[]> = {
         code: 200,
         data: account,
         message: "OK",
         pagination,
      };

      return response
   } catch (error) {
      throw error
   }
};

