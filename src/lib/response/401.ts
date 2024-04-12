import { NextResponse } from "next/server"


type Response401 = () => NextResponse

export const Response401: Response401 = () => {
   const res = {
      data: undefined,
      code: 401,
      message: '! Access Denied'
   }
   return NextResponse.json(res, { status: 401 })
}