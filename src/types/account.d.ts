import mongoose from "mongoose";
import { TransactionFormatted } from "./transaction";

export interface AccountRaw {
   account_name: string;
   account_type: "Cash" | 'Expenses' | 'Income' | 'Liability' | "Asset" | "Loss";
   is_debit: boolean;
   is_system_account: boolean;
   status: 'active' | 'inactive';
   description?: string;
   createdBy: mongoose.Types.ObjectId
   _id: string
}
export type AccountExpand = AccountRaw & {
   closing_balance: number;
   closing_balance_formatted: string;
   transactions: TransactionFormatted[];
   dateRange: string
}


export type AccountsQueryParams = {
   search?: string;
   search_by?: string;
   page?: string;
   limit?: string;
   sort_type?: string;
   sort_key?: string;
   type?: "Cash" | 'Expenses' | 'Income' | 'Liability' | "Asset" | "Loss"
}


export type AccountQueryParams = {
   page?: string;
   limit?: string;
   sort_type?: string;
   sort_key?: string;
   start_date?: string;
   end_date?: string;
   expand?: 'true' | 'false'
}

