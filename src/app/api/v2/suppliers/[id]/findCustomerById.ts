import { customerBalanceSummary } from "@Lib/customers/getCustomerBalance"
import { getCustomerById } from "@Lib/customers/getCustomerById"
import { getQueryParams } from "@Lib/global/getQueryParams"
import { ApiResponse } from "@Types/api"
import { Customer, ExpandCustomer } from "@Types/customer"

export const findCustomerById = async (req: Request, id: string) => {

   try {
      const expand = getQueryParams(req.url as string, 'expand', false)
      const customer = await getCustomerById(id)

      if (!expand) {
         const res: ApiResponse<Customer> = {
            data: customer,
            code: 200,
            message: "OK"
         }
         return res
      } else {
         const ids: any = [customer._id]
         const data = await customerBalanceSummary(ids)
         const res: ApiResponse<ExpandCustomer> = {
            data: data[0],
            code: 200,
            message: "OK"
         }
         return res
      }

   } catch (error: any) {
      throw error
   }

}