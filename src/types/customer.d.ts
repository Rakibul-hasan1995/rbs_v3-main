import { Schema } from "mongoose";

interface Contact {
   address: string;
   phone: string;
   contactParsonName: string;
}


type CustomerRaw = {
   _id: Schema.Types.ObjectId;
   email: string;
   user_name: string;
   roll: 'customer';
   password?: string;
   contact_details: Contact;
   opening_balance: number;
   exchange_rate: number;
   status: 'Pending' | 'Approved' | 'Decline' | 'Block'
}


export type ExpandCustomer = {
   _id: string;
   email: string;
   name: string;
   roll: 'customer';

   contact_details?: Contact;
   payment_amount: number;
   settlement_amount: number;
   invoice_amount: number;

   payment_amount_formatted: string;
   settlement_amount_formatted: string;
   invoice_amount_formatted: string;
   closing_amount: number;
   closing_amount_formatted: string;
   opening_amount?: number;
   opening_amount_formatted?: string;
   status: string;
}

export type Customer = {
   email: string;
   name: string;
   _id: string;
}

export type Supplier = {
   email: string;
   name: string;
   _id: string;
}


export type CustomerGetQueryParams = {
   page: string | number,
   limit: string | number,
   sort_type?: string,
   sort_key?: string,
   search?: string,
   search_by?: string,
   expand?: 'true' | 'false';
   status?: 'active' | 'inactive' | 'pending' | 'all'
}





export type CustomerStatementRow = {
   date: Date;
   date_formatted: string;
   page: string;
   debit_amount: number;
   debit_amount_formatted: string;
   credit_amount: number;
   credit_amount_formatted: string;
   descriptions?: string
}

export type CustomerStatement = {
   transactions: StatementRow[];
   total_debit_amount: number;
   total_debit_amount_formatted: string;
   total_credit_amount: number;
   total_credit_amount_formatted: string;
   customer_name: string;
   closing_amount: number;
   closing_amount_formatted: string
}

type CustomerStatementChart = {
   customer: {
      _id: string;
      name: string;

   },
   dateRange: string;
   groupBy: string;
   row: {
      date_label: string;
      debit_amount: number;
      credit_amount: number
   }[]

}