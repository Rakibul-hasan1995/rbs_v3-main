import { User, UserDocument } from "@DB/model/User";
import generatePagination from "@Lib/global/generatePagination";
import { Customer, CustomerGetQueryParams } from "@Types/customer";
import { Pagination } from "@Types/index";
import { FilterQuery } from "mongoose";



type Response = {
   data: Customer[];
   pagination: Pagination
}
type queryUser = (arg: CustomerGetQueryParams & { roll?: string, query?: FilterQuery<UserDocument> }) => Promise<Response>
export const queryUser: queryUser = async (arg) => {
   try {

      const { limit, page, search, search_by, sort_key = 'createdAt', sort_type = 'desc', roll = 'customer', status, query } = arg

      const skip = (+page - 1) * +limit;

      const regex = new RegExp(`${search}`, 'i')
      let filter = {}
      if (search_by && search) {
         filter = { [`${search_by}`]: { $regex: regex } }
      }

      if (Object.keys(filter).length) {
         filter = {
            $and:
               [
                  { roll },
                  { ...filter },
               ]
         }
      } else {
         filter = { roll }
      }
      if (status && status !== 'all') {
         filter = { ...filter, status }
      }

      let customers = await User.find(query || filter).select('-password')
         .skip(skip)
         .limit(+limit)
         .sort({ [sort_key]: sort_type == 'asc' ? 1 : -1 })
         .exec()

      const data = customers.map((item) => ({
         _id: item._id,
         name: item.user_name,
         email: item.email
      }))

      const count = await User.countDocuments(filter)
      const pagination = generatePagination(+page, +limit, count)

      return {
         data,
         pagination: pagination
      }


   } catch (error: any) {
      throw error
   }
}
