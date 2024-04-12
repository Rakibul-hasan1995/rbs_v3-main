import { Response401 } from "@Lib/response/401"
import dbConnect from "@DB/mongoose"

import { NextResponse } from "next/server"
import { Response500 } from "@Lib/response/500"
import { updateOrder } from "../controllers/updateOrder"
import { authorized } from "../../auth/helpers/authorized"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
try {
   const user = await authorized(['admin'])
   if (!user) {
      return Response401()
   }
   await dbConnect()
   const body = await request.json()
   const id = params.id
   const data = await updateOrder(id, body)
   return NextResponse.json(data, { status: data.code })
} catch (error) {
   return Response500(error)
}
   
  
}
