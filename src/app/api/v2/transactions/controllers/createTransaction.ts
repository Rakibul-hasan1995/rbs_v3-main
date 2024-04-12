import { Response400 } from "@Lib/response/400"
import { createJournal } from "@Lib/transactions/createJournal"
import { ApiResponse } from "@Types/api"

export const createTransaction = async (body: any) => {
   try {
      const { success, data, errors } = await createJournal(body)
      if (!success) {
         return Response400(errors)
      }
      const res: ApiResponse<any> = {
         code: 201,
         data,
         message: 'Successfully Save Transaction'
      }
      return res

   } catch (error: any) {
      throw error
   }
}

 