
import dbConnect from "@DB/mongoose"

import { NextResponse } from "next/server"
import { Response500 } from "@Lib/response/500"
import { Response401 } from "@Lib/response/401"
import { authorized } from "../../auth/helpers/authorized"
import { OrderRaw, orderUpdateBody } from "@Types/order"
import { Order } from "@DB/model/Order"
import { ApiResponse } from "@Types/api"


export async function POST(req: Request) {
   try {
      const user = await authorized(['admin'])
      if (!user) {
         return Response401()
      }
      await dbConnect()



      const body: orderUpdateBody = await req.json()
      const ids = body.ids
      const updates: any = {}
      if ('status' in body.update) {
         updates.status = body.update.status
      }
      if ('qty' in body.update) {
         updates.qty = body.update.qty
      }

      await Order.updateMany({ _id: { $in: ids } }, { $set: { ...updates } })
      const data: ApiResponse<any> = {
         code: 200,
         data: null,
         message: "Update Successful",
      }

      return NextResponse.json(data, { status: data.code })

   } catch (error) {
      return Response500(error)
   }
}
