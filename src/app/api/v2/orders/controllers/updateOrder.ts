import { Order } from "@DB/model/Order";
import updateOrderValidation from "@Lib/orders/updateValidation";
import { Response400 } from "@Lib/response/400";
import { ApiResponse } from "@Types/api";

export const updateOrder = async (id: string, body: any) => {
   try {
      let order = await Order.findById(id)
      if (!order) {
         return {
            code: 400,
            message: 'Order Not Found'
         }
      }
      const validate = updateOrderValidation(body);
      if (!validate.isValid) {
         return Response400(validate.error)
      }
      Object.assign(order, validate.updates)
      await order.save()

      const res: ApiResponse<any> = {
         code: 200,
         message: "Update Success",
         data: undefined
      }
      return res
   } catch (error: any) {
      throw error
   }
}
