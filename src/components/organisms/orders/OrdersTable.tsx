'use client';;
import { OrderRaw, Orders, OrdersExpand } from '@Types/order';
import { Avatar, Chip, IconButton, } from '@material-tailwind/react';

import useSearchParamsHook from '@Lib/global/useSearchParams';
import { useSharedContext } from '@/context/sharedContext';
import useOrderServices, { OrderContext } from '@/services/useOrderServices';
import Table, { ColumnDef } from '@/components/templates/Table';
import { FaMinus, FaRegEye, FaUser } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';
import CheckBoxInput from '@/components/atoms/inputs/CheckBox';
import OrdersNav from '@/components/organisms/orders/OrdersNav';



export const statusColor: any = {
   Processing: 'blue',
   Placed: 'amber',
   Shipped: 'green',
   Pending: 'red',
   Completed: 'cyan',
}



function OrderTable() {
   const { state, setState }: OrderContext = useSharedContext()
   const orders = state?.orders
   const checkedItems = state?.checkedItems || {}
   const pagination = state?.orders?.pagination
   const { pushQuery } = useSearchParamsHook()



   const handleCheckboxChange = (id: string) => {
      setState((prev) => ({ ...prev, checkedItems: { ...checkedItems, [id]: !checkedItems[id] } }))
   };

   const isChecked = Object.values(checkedItems).filter(value => value)
   const isCheckedAll = Boolean(orders?.data?.length && isChecked.length == orders.data.length)

   const handleCheckAll = () => {
      if (isCheckedAll) {
         setState((prev) => ({ ...prev, checkedItems: {} }))

      } else {
         let value: any = {}
         orders?.data.map((item) => {
            value = { ...value, [item._id]: true }
         })
         setState((prev) => ({ ...prev, checkedItems: value }))
      }
   };

   const columnDef: ColumnDef<OrdersExpand>[] = [
      {
         headerName: 'Check Box',
         field: '_id',
         headerCssClass: "w-2  !p-0 !px-0",
         cssClass: "!p-0 h-0 ",
         headerFormatter: () => {
            return (
               <CheckBoxInput
                  onChange={handleCheckAll}
                  indeterminate={Boolean(isChecked.length && !isCheckedAll)}
                  checked={isCheckedAll || Boolean(isChecked.length && !isCheckedAll)}
               />
            )
         },
         formatter: (value) => {
            return (
               <div className="w-full h-full flex items-center justify-center">
                  <CheckBoxInput
                     checked={checkedItems[value] || false}
                     onChange={() => handleCheckboxChange(value)}
                  />
               </div>
            )
         }
      },
      {
         headerName: 'Customer',
         field: ['customer', 'user_name'],
         sortable: false,
         editable: false,
         searchable: true,
         cssClass: ' text-text-primary-light dark:text-text-primary-dark font-semibold',
         headerCssClass: "text-left",
      },
      {
         field: '_id',
         headerName: 'Program',
         sortable: true,
         cssClass: '!w-[75px]',
         formatter: (value, row) => `# ${row?.program_name}`,
         headerCssClass: ''
      },
      {
         field: 'order_name',
         headerName: 'Order Name',
         editable: true,
         cssClass: '!w-[150px] !text-left',
         sortable: true
      },
      {
         field: 'qty',
         headerName: 'Qty',
         formatter: (value) => `${value} Pcs`,
         type: "number",
         editable: true,
         headerCssClass: "min-w-[90px]"
      },
      {
         field: 'receive_qty',
         headerName: 'Rec Qty',
         formatter: (value) => `${value} Pcs`,
         type: "number",
      },
      {
         field: 'production_qty',
         headerName: 'Prod Qty',
         formatter: (value, row) => {
            const qty = row?.qty || 0
            const percent = +value / +qty * 100
            return (
               <>
                  <p>{`${value} Pcs`}</p>
                  <p className='border_t text-[9px]'>{percent.toFixed()} % </p>
               </>
            )
         },
         type: "number",
      },
      {
         field: 'delivery_qty',
         headerName: 'Del Qty',
         // formatter: (value) => `${value} Pcs`,
         type: "number",
         formatter: (value, row) => {
            const qty = row?.qty || 0
            const percent = +value / +qty * 100
            return (
               <>
                  <p>{`${value} Pcs`} </p>
                  <p className='border_t text-[9px]'>{percent.toFixed()} % </p>
               </>
            )
         },
      },
      {
         field: 'rate_formatted',
         headerName: 'Rate',
         type: "number",
      },
      {
         field: ['cover_photo', 'href'],
         headerName: 'Design',
         cssClass: '!p-1',
         formatter: (value, row) => {
            return (
               <Avatar
                  src={value}
                  alt="avatar"
                  variant='rounded'
                  size="xl" loading='lazy'
                  withBorder={false} className='p-1 object-fill rounded-md shadow-lg h-[40px] w-[60px] '
               />
            )
         }
      },
      {
         field: 'status',
         headerName: 'Status',
         cssClass: '!h-0 !p-0',
         sortable: true,
         formatter: (value, row) => {
            return (
               <div className={`flex justify-center items-center w-full h-full bg-[${statusColor[value]}]`}>
                  <Chip color={statusColor[value]} value={value} size='sm' className='w-auto text-[9px] text-center items-center px-2 py-1' />
               </div>
            )
         }
      },
      {
         field: '_id',
         headerName: 'Actions',
         cssClass: 'h-0',
         formatter: (value) => {
            return (
               <div className="flex gap-2 justify-center">
                  <IconButton size='sm'
                     className='rounded-full w-6 h-6'
                     color='cyan'
                     onClick={() => { pushQuery({ selected: value }) }}
                  >
                     <FaRegEye className='w-4 h-4' />
                  </IconButton>
                  <IconButton size='sm' className='rounded-full w-6 h-6' color='amber'>
                     <TbEdit className='w-4 h-4' />
                  </IconButton>

               </div>
            )
         }
      },
   ]




   const { updateOrder } = useOrderServices({})
   const handleUpdate = async (value: Partial<OrderRaw>, row: Orders) => {
      const data = await updateOrder(row._id, value)
      if (data.code == 200) {
         const orders: any = state?.orders?.data
         const orderIndex: any = state?.orders?.data.findIndex((item) => item._id == row._id)
         orders[orderIndex] = { ...orders[orderIndex], ...value }
      }
   }
   // if (state?.loadingOrders) {
   //    return (
   //       <div className="flex_center">
   //          Loading...
   //       </div>
   //    )
   // }



   return (
      <div className="bg_secondary pt-1" >
         <Table
            columnDef={columnDef}
            onClickRow={(r: Orders) => {
               // pushQuery({ selected: r._id })
               // handleCheckboxChange(r._id)
            }}
            rowStep
            topSpace='0'
            headerCssClass='top-0'
            loading={state?.loadingOrders}
            containerClass='h-[calc(100vh-115px)] border_a rounded-md'
            rowData={orders?.data || []}
            pagination={pagination}
            onCellValueChange={handleUpdate}
         />

      </div>
   )
}

export default OrderTable