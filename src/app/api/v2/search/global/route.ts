import { Response401 } from "@Lib/response/401"
import dbConnect from "@DB/mongoose"

import { NextResponse } from "next/server"
import { Response500 } from "@Lib/response/500"
import { authorized } from "../../auth/helpers/authorized"
import { getQueryParams } from "@Lib/global/getQueryParams"
import { FilterQuery } from "mongoose"
import { OrderDocument } from "@DB/model/Order"
import { queryOrder } from "@Lib/orders/queryOrder"
import { UserDocument } from "@DB/model/User"
import { queryUser } from "@Lib/user/query"
import { ApiResponse } from "@Types/api"

export async function GET(req: Request) {
   try {
      const user = await authorized(['admin', 'user'])

      if (!user) {
         return Response401()
      }
      await dbConnect()

      const searchTerm = getQueryParams(req.url as string, 'search', undefined)
      const limit = getQueryParams(req.url as string, 'limit', 5)

      const regex = new RegExp(searchTerm, 'i')

      const orderQuey: FilterQuery<OrderDocument> = {
         $or: [
            { order_name: regex },
            { program_name: regex },
         ]
      }
      const customerQuery: FilterQuery<UserDocument> = {
         $or: [
            { user_name: regex },
            { email: regex },

         ],
         roll : "customer"
      }

      const { data: orders } = await queryOrder({ limit, query: orderQuey ,sort_key: "createdAt"})
      const { data: customers } = await queryUser({ limit, expand: 'false', page: 1, query: customerQuery, sort_key: "createdAt" })

      const response: ApiResponse<any> = {
         code: 200,
         data: {
            orders,
            customers
         },
         message: 'Ok'
      }




      return NextResponse.json(response, { status: 200 })

   } catch (error) {
      return Response500(error)
   }
}
