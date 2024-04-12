import { NextResponse } from "next/server"
import { authorized } from "../auth/helpers/authorized"
import dbConnect from "@DB/mongoose"
import { findAccounts } from "./controllers/findAccounts"
import { Response500 } from "@Lib/response/500"
import { createAccount } from "./controllers/createAccount"
import { Response400 } from "@Lib/response/400"


export async function POST(req: Request) {
   try {
      const user = await authorized(['admin'])
      if (!user) {
         return NextResponse.json({ message: 'access denied' }, { status: 401 })
      }
      await dbConnect()
      const body = await req.json()
      const data = await createAccount(body, user.id)
      return NextResponse.json(data, { status: data.code })

   } catch (error: any) {
      if (error.message == 'Unexpected end of JSON input') {
         const res = Response400({ account_name: "! Account Name is Required" })
         return NextResponse.json(res, { status: res.code })
      }
      return Response500(error)
   }
}


export async function GET(req: Request) {
   try {
      const user = await authorized(['admin'])
      if (!user) {
         return NextResponse.json({ message: 'access denied' }, { status: 401 })
      }
      await dbConnect()
      const data = await findAccounts(req.url)
      return NextResponse.json(data, { status: data.code })

   } catch (error) {
      return Response500(error)
   }
}

