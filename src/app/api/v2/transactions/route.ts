import dbConnect from "@DB/mongoose"
import { authorized } from "../auth/helpers/authorized"
import { Response401 } from "@Lib/response/401"
import { findTransactions } from "./controllers/findTransaction"
import { NextResponse } from "next/server"
import { Response500 } from "@Lib/response/500"
import { createTransaction } from "./controllers/createTransaction"
import { Response400 } from "@Lib/response/400"

export async function GET(req: Request) {
   try {
      const user = await authorized(['admin'])
      if (!user) {
         return Response401()
      }
      await dbConnect()
      const data = await findTransactions(req.url)
      return NextResponse.json(data, { status: data.code })

   } catch (error) {
     return Response500(error)
   }
}

export async function POST(req: Request) {
   try {
      const user = await authorized(['admin'])
      if (!user) {
         return Response401()
      }
      await dbConnect()
      const body = await req.json()
      const data = await createTransaction(body)
      
      return NextResponse.json(data, { status: data.code })

   } catch (error:any) {
      if (error.message == 'Unexpected end of JSON input') {
         const res = Response400({ date: "! Date is Required" })
         return NextResponse.json(res, { status: res.code })
      }
      return Response500(error)
   }
}

