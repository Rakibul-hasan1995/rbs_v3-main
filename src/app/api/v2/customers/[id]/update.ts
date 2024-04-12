import { User } from "@DB/model/User"
import { ApiResponse } from "@Types/api"
import { CustomerRaw } from "@Types/customer";

export const updateCustomerById = async (id: string, body: Partial<CustomerRaw>) => {

   try {
      await User.findByIdAndUpdate(id, body, { new: true })
      const res: ApiResponse<undefined> = {
         data: undefined,
         code: 200,
         message: "Successfully Update Customer"
      }
      return res

   } catch (error: any) {
      throw error
   }

}