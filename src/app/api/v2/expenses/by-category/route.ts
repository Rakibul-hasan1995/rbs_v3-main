import dbConnect from "@DB/mongoose"
import { authorized } from "../../auth/helpers/authorized"
import { NextResponse } from "next/server"
import { getExpenseByCategory } from "./getExpenseByCategory"
import { Response500 } from "@Lib/response/500"

export async function GET(req: Request) {
   try {
      const user = await authorized(['admin'])
      if (!user) {
         return NextResponse.json({ message: 'access denied' }, { status: 401 })
      }
      await dbConnect()
      const res = await getExpenseByCategory(req.url)
      return NextResponse.json(res, { status: res.code })

   } catch (error) {
      return Response500(error)
   }
}

