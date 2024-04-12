import { BiShoppingBag } from "react-icons/bi";
import { FaArchive, FaUser, FaUserTie } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { RiArchiveLine } from "react-icons/ri";

export type MenuChild = {
   title: string;
   name: string;
   icon?: any;
   link: string;
}
export interface MenuItem {
   title: string;
   name: string;
   icon?: any;
   child?: MenuChild[];
   link?: string;
   parent: boolean
}




export const sidebarItems: MenuItem[] =
   [
      {
         icon: <MdHome className='w-5 h-5' />,
         title: "Dashboard",
         name: 'dsb',
         child: undefined,
         parent: false,
         link: "/v3/dsb/dashboard"
      },
      {
         icon: <RiArchiveLine className='w-5 h-5' />,
         title: "Orders",
         name: 'ord',
         child: undefined,
         parent: false,
         link: "/v3/ord/orders"
      },
      {
         icon: <BiShoppingBag className="w-5 h-5" />,
         title: "Sales",
         name: 'sales',
         parent: true,
         child: [
            {
               title: "Customers",
               name: 'customers',
               link: "/v3/sales-customers/customers"
            },
            {
               title: "Invoice",
               name: 'invoice',
               link: "/v3/sales-invoice/invoices"
            },
            {
               title: "Payment Received",
               name: 'p-r',
               link: "/v3/sales-p-r/payment-received"
            },
         ]
      },
      {
         icon: <BiShoppingBag className="w-5 h-5 " />,
         title: "Purchase",
         name: 'purchase',
         parent: true,
         child: [
            {
               title: "Suppliers",
               name: 'supplier',
               link: "/v3/purchase-supplier/suppliers",
               // icon: <UserGroupIcon className='w-5 h-5' />
            },
            {
               title: "Expenses",
               name: 'expenses',
               link: "/v3/purchase-expenses/expenses",
               // icon: <BanknotesIcon className='w-5 h-5' />

            },
         ]
      },
      {
         icon: <FaUserTie className="w-5 h-5"  />,
         title: "Accountant",
         name: 'acc',
         parent: true,
         child: [
            {
               title: "Manual Journals",
               name: 'mj',
               // link: "/v3/acc-mj/journals",
               link: "#",
               // icon: <UserGroupIcon className='w-5 h-5' />
            },
            {
               title: "Chart Of Accounts",
               name: 'coa',
               link: "/v3/acc-coa/chart-of-accounts",
               // icon: <BanknotesIcon className='w-5 h-5' />

            },
         ]
      }
   ]