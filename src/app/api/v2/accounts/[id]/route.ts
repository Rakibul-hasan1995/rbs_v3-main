import { NextResponse } from "next/server"
import { authorized } from "../../auth/helpers/authorized"
import dbConnect from "@DB/mongoose"
import { Response401 } from "@Lib/response/401"
import { getAccountById } from "../controllers/getAccountById"
import { Response500 } from "@Lib/response/500"


export async function GET(req: Request, { params }: { params: { id: string } }) {

   try {
      const user = await authorized(['admin'])
      if (!user) {
         return Response401()
      }
      await dbConnect()
      const id = params.id
      const data = await getAccountById(req.url, id)
      return NextResponse.json(data, { status: data.code })

   } catch (error) {
      return Response500(error)
   }
}

