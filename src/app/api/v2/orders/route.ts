import { Response401 } from "@Lib/response/401"
import { authorized } from "../auth/helpers/authorized"
import dbConnect from "@DB/mongoose"

import { NextResponse } from "next/server"
import { Response500 } from "@Lib/response/500"
import { findOrder } from "./controllers/findOrder"

export async function GET(req: Request) {
   try {
      const user = await authorized(['admin'])
     
      if (!user) {
         return Response401()
      }
      await dbConnect()


      const data = await findOrder(req.url)
      return NextResponse.json(data, { status: data.code })

   } catch (error) {
      return Response500(error)
   }
}
