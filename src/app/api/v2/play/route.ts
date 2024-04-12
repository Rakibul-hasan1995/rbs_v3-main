import { Transaction } from "@DB/model/transaction";
import dbConnect from "@DB/mongoose";
import { Response500 } from "@Lib/response/500";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { TransactionRaw } from "@Types/transaction";
import moment from "moment";
import { _arrSum } from "@Lib/global/arrSum";
import { getQueryParams } from "@Lib/global/getQueryParams";

let dateFormate = '%Y-%m-%d'

const format_day = "%Y-%m-%d"
const format_month = "%Y-%m"
const format_year = "%Y"

export async function GET(_request: Request) {
   try {
      await dbConnect()

      const start_date = getQueryParams(_request.url as string, 'start_date', moment('2020').startOf('month').toISOString())
      const end_date = getQueryParams(_request.url as string, 'end_date', moment().endOf('month').toISOString())
      const groupBy = getQueryParams(_request.url as string, 'group_by', 'month')

      if (groupBy == 'month') {
         dateFormate = format_month
      }
      if (groupBy == 'year') {
         dateFormate = format_year
      }
      if (groupBy == 'day') {
         dateFormate = format_day
      }

      const x: TransactionRaw[] = await Transaction.aggregate([
         {
            $match: {
               customer_id: new mongoose.Types.ObjectId('62dc23bf185b37da5e893ebb'),
               date: { $gt: new Date(moment(start_date).startOf('D').toISOString()), $lt: new Date(moment(end_date).endOf('D').toISOString()) }
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

      console.log(x)

      return NextResponse.json(x, { status: 200 })
   } catch (error) {
      console.log(error)
      return Response500(error)
   }
}