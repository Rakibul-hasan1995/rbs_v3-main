import { Payment } from "@DB/model/Payment"
import { paymentFormatter } from "@Lib/payments/formatter"
import paymentValidation from "@Lib/payments/validation"
import { Response400 } from "@Lib/response/400"
import { createJournal } from "@Lib/transactions/createJournal"
import { ApiResponse } from "@Types/api"
import { PaymentFormatted, PaymentRaw } from "@Types/payment"

const createPayment = async (body: Partial<PaymentRaw>) => {
   try {
      const { error, isValid } = paymentValidation(body)
      if (!isValid) {
         return Response400(error)
      }
      const payment: any = new Payment(body)
      await payment.save()
      await createJournal({
         amount: payment.amount,
         date: payment.date,
         paid_from_account: "65c0c17289eed83404adf657",
         paid_to_account: "65b88a8880a3b3419a5804ea",
         type: "Customer Payment",
         customer_id: payment.customer,
         reference: `MRC_No: ${payment.receipt_no}`
      })


      const res: ApiResponse<PaymentFormatted> = {
         code: 201,
         data: paymentFormatter(payment._doc),
         message: "successfully create payment",
      }
      return res
   } catch (error) {
      throw error
   }
}
export default createPayment