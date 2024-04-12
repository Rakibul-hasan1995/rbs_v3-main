import dbConnect from "@DB/mongoose"
import { NextResponse } from "next/server"
import { Response500 } from "@Lib/response/500"
import moment from "moment"
import { getQueryParams } from "@Lib/global/getQueryParams"
import { Transaction } from "@DB/model/transaction"
import { ApiResponse } from "@Types/api"
import mongoose from "mongoose"
import { findCustomerById } from "../../findCustomerById"
import { CustomerStatementChart } from "@Types/customer"

let dateFormate = '%Y-%m-%d'


const format_day = "%Y-%m-%d"
const format_month = "%Y-%m"
const format_year = "%Y"


let dateFormateM = 'MMM-DD'
const dateformat_day = "MMM-DD"
const dateformat_month = "MMM-yyyy"
const dateformat_year = "yyyy"


export async function GET(req: Request, { params }: { params: { id: string } }) {
   try {
      // const user = await authorized(['admin'])
      // if (!user) {
      //    return Response401()
      // }
      await dbConnect()

      const customer = await findCustomerById(req, params.id)
      const start_date = getQueryParams(req.url as string, 'start_date', moment('2020').startOf('month').toISOString())
      const end_date = getQueryParams(req.url as string, 'end_date', moment().endOf('month').toISOString())
      const groupBy = getQueryParams(req.url as string, 'group_by', 'month')

      if (groupBy == 'month') {
         dateFormate = format_month
         dateFormateM = dateformat_month
      }
      if (groupBy == 'year') {
         dateFormate = format_year
         dateFormateM = dateformat_year
      }
      if (groupBy == 'day') {
         dateFormate = format_day
         dateFormateM = dateformat_day
      }

      const data = await Transaction.aggregate([
         {
            $match: {
               customer_id: new mongoose.Types.ObjectId(params.id),
               date: { $gt: new Date(moment(start_date).startOf('D').toISOString()), $lt: new Date(moment(end_date).endOf('D').toISOString()) },
               $or: [
                  {
                     $and: [
                        { type: 'Customer Payment' },
                        { debit_amount: { $gt: 0 } }
                     ]
                  },
                  {
                     $and: [
                        { type: 'Invoice' },
                        { credit_amount: { $gt: 0 } }
                     ]
                  }
               ],
            }
         },
         {
            $project: {
               debit_amount: 1,
               credit_amount: 1,
               date_string: {
                  $dateToString: { format: dateFormate, date: "$date" }
               },
               date: 1

            }
         },
         {
            $group: {
               _id: "$date_string",
               debit_amount: { $sum: "$debit_amount" },
               credit_amount: { $sum: "$credit_amount" },
            }
         },
         {
            $sort: {
               _id: 1,
            }
         },
      ])

      const res: ApiResponse<CustomerStatementChart> = {
         code: 200,
         message: "Ok",
         data: {
            customer: {
               _id: customer.data._id.toString(),
               name: customer.data.name
            },
            dateRange: `From ${moment(start_date).format('DD MMM yyyy')} To ${moment(end_date).format('DD MMM yyyy')}`,
            groupBy,
            row: data.map((item) => ({
               date_label: moment(item._id).format(dateFormateM),
               debit_amount: item.debit_amount,
               credit_amount: item.credit_amount,
            })),
         },

      }

      return NextResponse.json(res, { status: res.code })

   } catch (error) {

      return Response500(error)
   }
}

