import { NextResponse } from "next/server"
import dbConnect from "@DB/mongoose"
import { registerValidator } from "@Validator/auth/register"
import { Response400 } from "@/lib/response/400"
import { login } from "./login"
import { Response500 } from "@Lib/response/500"

export const POST = async (request: Request) => {
   try {
      await dbConnect()
      const body = await request.json()
      const res = await login(body)

      return NextResponse.json(res, { status: res.code })
   } catch (error: any) {
      if (error.message == 'Unexpected end of JSON input') {
         const data = registerValidator({})
         const res = Response400(data.error)
         return NextResponse.json(res, { status: res.code })
      }
      return Response500(error)
   }
}