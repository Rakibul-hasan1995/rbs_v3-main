import { Response401 } from "@Lib/response/401"
import { authorized } from "../auth/helpers/authorized"
import dbConnect from "@DB/mongoose"

import { NextResponse } from "next/server"
import { Response500 } from "@Lib/response/500"
import { findPayments } from "./controllers/findPayments"
import createPayment from "./controllers/createPayment"

export async function GET(req: Request) {
   try {
      const user = await authorized(['admin'])
      if (!user) {
         return Response401()
      }
      const data = await findPayments(req.url)
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
      const body = await req.json()
      const data = await createPayment(body)
      return NextResponse.json(data, { status: data.code })

   } catch (error) {
      return Response500(error)
   }
}
