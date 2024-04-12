import { getQueryParams } from "@Lib/global/getQueryParams";
import { queryUser } from "@Lib/user/query";
import { ApiResponse } from "@Types/api";
import { Supplier } from "@Types/customer";

type ApiRes = ApiResponse<Supplier[]>
type FindCustomer = (req: Request) => Promise<ApiRes>
export const findCustomer: FindCustomer = async (req: Request) => {
   try {
      const page = getQueryParams(req.url as string, 'page', 1);
      const limit = getQueryParams(req.url as string, 'limit', 10)
      const sort_type = getQueryParams(req.url as string, 'sort_type', 'asc')
      const sort_key = getQueryParams(req.url as string, 'sort_key', 'user_name')
      const search = getQueryParams(req.url as string, 'search', undefined)
      const search_by = getQueryParams(req.url as string, 'search_by', undefined)


      const { data: customers, pagination } = await queryUser({ page: +page, limit: +limit, search, sort_key, sort_type, search_by, roll: 'supplier' })

      const response: ApiRes = {
         data: customers,
         code: 200,
         message: "OK",
         pagination

      }
      return response

   } catch (error: any) {
      throw error
   }

}