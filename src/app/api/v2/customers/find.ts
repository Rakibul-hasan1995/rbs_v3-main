import { customerBalanceSummary } from "@Lib/customers/getCustomerBalance";
import { _arrSum } from "@Lib/global/arrSum";
import { getQueryParams } from "@Lib/global/getQueryParams";
import { queryUser } from "@Lib/user/query";
import { ApiResponse } from "@Types/api";
import { Customer, ExpandCustomer } from "@Types/customer";

type ApiRes = ApiResponse<ExpandCustomer[] | Customer[]>
type FindCustomer = (req: Request) => Promise<ApiRes>
export const findCustomer: FindCustomer = async (req: Request) => {
   try {
      const page = getQueryParams(req.url as string, 'page', 1);
      const limit = getQueryParams(req.url as string, 'limit', 10)
      const sort_type = getQueryParams(req.url as string, 'sort_type', 'asc')
      const sort_key = getQueryParams(req.url as string, 'sort_key', 'user_name')
      const search = getQueryParams(req.url as string, 'search', undefined)
      const search_by = getQueryParams(req.url as string, 'search_by', undefined)
      const expand = getQueryParams(req.url as string, 'expand', false)
      const status = getQueryParams(req.url as string, 'status', '')

      const { data: customers, pagination } = await queryUser({ page: +page, limit: +limit, search, sort_key, sort_type, search_by, roll: 'customer', status })

      if (!expand) {
         const response: ApiRes = {
            data: customers,
            code: 200,
            message: "OK",
            pagination

         }
         return response
      } else {
         const ids: any = customers.map((item) => item._id)
         let data = await customerBalanceSummary(ids)
         if (sort_key && sort_type) {
            _arrShortDss(data, sort_key, sort_type)
         }

         const response: ApiRes = {
            data,
            code: 200,
            message: "OK",
            pagination
         }
         return response
      }
   } catch (error: any) {
      console.log(error)
      throw error
   }

}

export const _arrShortDss = (x: any[], y: any, z: 'asc' | 'desc') => {
   x.sort(function (a: any, b: any) {
      var keyA = a[y],
         keyB = b[y]

      // Compare the 2 dates
      if (keyA < keyB) return z == 'asc' ? 1 : -1;
      if (keyA > keyB) return z == 'asc' ? -1 : 1;
      return 0
   });
}


