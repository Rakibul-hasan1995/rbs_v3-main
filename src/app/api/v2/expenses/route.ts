import { Response401 } from "@Lib/response/401"
import { authorized } from "../auth/helpers/authorized"
import dbConnect from "@DB/mongoose"
import { findExpense } from "./findExpense"
import { NextResponse } from "next/server"
import { Response500 } from "@Lib/response/500"

export async function GET(req: Request) {
   try {
      const user = await authorized(['admin'])
      if (!user) {
         return Response401()
      }
      await dbConnect()
      const data = await findExpense(req.url)
      return NextResponse.json(data, { status: data.code })

   } catch (error) {
      return Response500(error)
   }
}
