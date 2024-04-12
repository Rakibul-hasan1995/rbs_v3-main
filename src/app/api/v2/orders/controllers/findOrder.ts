import { OrderDocument } from "@DB/model/Order";
import { User } from "@DB/model/User";
import { getQueryParams } from "@Lib/global/getQueryParams";
import { queryOrder } from "@Lib/orders/queryOrder";
import { FilterQuery } from "mongoose";

export const findOrder = async (url: string) => {
   try {
      const searchTerm = getQueryParams(url as string, 'search', undefined)
      const searchBy = getQueryParams(url as string, 'search_by', undefined)
      const filterKey = getQueryParams(url as string, 'filter_key', '')
      const filterValue = getQueryParams(url as string, 'filter_value', '')
      const status = getQueryParams(url as string, 'status', '')
      const page = getQueryParams(url as string, 'page', 1);
      const limit = getQueryParams(url as string, 'limit', 10)
      const sort_type = getQueryParams(url as string, 'sort_type', 'desc')
      const sort_key = getQueryParams(url as string, 'sort_key', '_id')
      const expand = getQueryParams(url as string, 'expand', false)

      const regex = new RegExp(searchTerm, 'i')
      let query: FilterQuery<OrderDocument> = {}


      if (filterKey && filterValue) {
         query = {
            [filterKey]: {
               $nin: filterValue,
            },
         }
      }

      if (searchBy && searchTerm) {
         query = { ...query, [searchBy]: { $regex: regex } }
      }

  


      if (searchTerm && !searchBy) {
         query = {
            ...query,
            $or: [
               { program_name: { $regex: regex } },
               { order_name: { $regex: regex } },
               // tags: { "$in": [regex] },
            ],
         }
      }

      if (searchBy == 'customer.user_name') {
         const customers = await User.find({ user_name: regex })
         const customersIds = customers.map((item) => item._id)
         query = {}
         if (filterKey && filterValue) {
            query = {
               [filterKey]: {
                  $nin: filterValue,
               },
            }
         }
         query = { ...query, customer: { $in: customersIds }, }
         
      }

      if (status) {
         query = { ...query, status: { $regex: status } }
      }
      return await queryOrder({ expand, limit, page, sort_key, sort_type, query })

   } catch (error: any) {
      throw error
   }
};
