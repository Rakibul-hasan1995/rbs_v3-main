
import { Payment } from "@DB/model/Payment";
import { User } from "@DB/model/User";
import generatePagination from "@Lib/global/generatePagination";
import { getQueryParams } from "@Lib/global/getQueryParams";
import { numberWithCommas } from "@Lib/global/numberFormater";
import { paymentFormatter } from "@Lib/payments/formatter";
import { PaymentFormatted } from "@Types/payment";
import moment from "moment";


export const findPayments = async (url: any,) => {
   try {

      const page = getQueryParams(url as string, 'page', 1);
      const limit = getQueryParams(url as string, 'limit', 10)
      const sortType = getQueryParams(url as string, 'sort_type', 'desc')
      const sortKey = getQueryParams(url as string, 'sort_key', 'receipt_no')
      const searchTerm = getQueryParams(url as string, 'search', undefined)
      const searchBy = getQueryParams(url as string, 'search_by', 'customer.user_name')
      const start_date = getQueryParams(url as string, 'start_date', null)
      const end_date = getQueryParams(url as string, 'end_date', null)

      const skip = (page - 1) * limit;

      const regex = new RegExp(searchTerm, 'i')
      let filter = {}


      if (searchBy && searchTerm) {
         filter = { [searchBy]: { $regex: regex } }
      }

      if (searchBy == 'customer.user_name') {
         const customers = await User.find({ user_name: regex })
         const customersIds = customers.map((item) => { return item._id })
         filter = { customer: { $in: customersIds }, }
      }

      if (start_date) {
         filter = {
            ...filter,
            date: {
               $gt: new Date(start_date),
               $lt: new Date(end_date)

            }
         }
      }

      const data: any = await Payment.find(filter)
         .skip(skip)
         .limit(limit)
         .sort({ [sortKey]: sortType })
         .populate('customer', 'user_name')
         .lean()



      const payments: PaymentFormatted[] = data.map((item: any) => (paymentFormatter(item)))


      const count = await Payment.countDocuments(filter)
      const pagination = generatePagination(page, limit, count)
      const response = {
         code: 200,
         data: payments,
         pagination,
      };

      return response
   } catch (error: any) {
      throw error
   }
};

