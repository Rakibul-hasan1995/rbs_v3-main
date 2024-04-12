import { User } from "@DB/model/User"
import { Customer } from "@Types/customer"

type queryUser = (id: string) => Promise<Customer>
export const getCustomerById: queryUser = async (id) => {
   try {

      let customer = await User.findById(id).select('-password')
         .exec()
      if (!customer) {
         throw new Error("Resource not found", { cause: 404 })
      }

      const data = {
         _id: customer._id,
         name: customer.user_name,
         email: customer.email
      }
      return data

   } catch (error: any) {
      throw error
   }
}
