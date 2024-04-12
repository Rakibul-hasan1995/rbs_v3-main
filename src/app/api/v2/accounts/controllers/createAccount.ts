

import { Account } from "@DB/model/account";
import { Response400 } from "@Lib/response/400";
import { ApiResponse } from "@Types/api";
import mongoose from "mongoose";

type Body = {
   account_name: string;
   account_type: string;
   is_debit: boolean;
   is_system_account: boolean;
   status: 'active' | 'inactive';
   description?: string;
   createdBy: mongoose.Types.ObjectId
}

export const createAccount = async (body: Body, userId: string) => {
   try {
      if (!body.account_name) {
         return Response400({ account_name: '! Account name is required' })
      }

      const { account_name, account_type = 'expanse', is_debit = false, is_system_account = false, description = '', status = 'active' } = body
      const find = await Account.findOne({ account_name })
      if (find) {
         const res: ApiResponse<any> = {
            code: 409,
            data: { account_name: `!"${account_name}" already exist` },
            message: "Conflict With Account Name",
         }
         return res
      }
      const account = new Account({ account_name, account_type, is_debit, is_system_account, description, status, createdBy: userId })
      await account.save()

      const res: ApiResponse<any> = {
         code: 200,
         data: account,
         message: "OK",
      }
      return res

   } catch (error: any) {
      throw error
   }

}

