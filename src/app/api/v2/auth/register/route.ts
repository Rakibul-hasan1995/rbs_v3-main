import { NextResponse } from "next/server"
import dbConnect from "@DB/mongoose"
import {  register } from "./register"
import { registerValidator } from "@Validator/auth/register"
import { Response400 } from "@/lib/response/400"

export const POST = async (request: Request) => {
   try {
      await dbConnect()
      const body = await request.json()

      const res = await register(body)

      return NextResponse.json(res, { status: res.code })
   } catch (error: any) {
      if (error.message == 'Unexpected end of JSON input') {
         const data = registerValidator({})
         const res = Response400(data.error)
         return NextResponse.json(res, { status: res.code })
      }
      return NextResponse.json({ 'message': 'internal server error' }, { status: 500 })
   }
}