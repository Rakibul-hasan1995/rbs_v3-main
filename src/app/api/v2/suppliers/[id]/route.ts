import { NextResponse } from "next/server"
import { authorized } from "../../auth/helpers/authorized"
import dbConnect from "@DB/mongoose"
import { Response500 } from "@Lib/response/500"
import { Response401 } from "@Lib/response/401"
import { findCustomerById } from "./findCustomerById"

export async function GET(req: Request, { params }: { params: { id: string } }) {
   try {
      const user = await authorized(['admin'])
      if (!user) {
         return Response401()
      }
      await dbConnect()

      const res = await findCustomerById(req, params.id)
      return NextResponse.json(res, { status: res.code })

   } catch (error) {

      return Response500(error)
   }
}

