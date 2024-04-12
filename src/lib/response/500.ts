import { ApiResponse } from "@Types/api"
import { NextResponse } from "next/server"


type Response500 = (data: any) => NextResponse

export const Response500: Response500 = (data: Error) => {
   const res = {
      data,
      code: data.cause || 500,
      message: data.message || 'internal server error'
   }
   return NextResponse.json(res, { status: data.cause as any || 500 })
}