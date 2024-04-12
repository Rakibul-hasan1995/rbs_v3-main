import { ApiResponse } from "@Types/api"


type Response400 = (data: any) => ApiResponse<any>

export const Response400: Response400 = (data: any) => {
   const res = {
      data,
      code: 400,
      message: 'Bad Request'
   }
   return res
}