import { Response401 } from "@Lib/response/401"
import { authorized } from "../../auth/helpers/authorized"
import dbConnect from "@DB/mongoose"
import { updateTransaction } from "@Lib/transactions/updateTransaction"
import { NextResponse } from "next/server"
import { Response500 } from "@Lib/response/500"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
   try {
      const user = await authorized(['admin'])
      if (!user) {
         return Response401()
      }
      await dbConnect()
      const body = await req.json()
      const data = await updateTransaction(body, params.id)
      return NextResponse.json(data, { status: data.code })

   } catch (error) {
      return Response500(error)
   }
}