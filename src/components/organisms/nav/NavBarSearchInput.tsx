
import { AsyncOption, AsyncSelectInput } from '@/components/atoms/inputs/AsyncSelect'
import { generateExpandedOrders } from '@/faker/orders'
import { Axios } from '@Lib/global/axios-config'
import { ImageUrlConfig } from '@Lib/global/imageUrlConfig'
import { ApiResponse } from '@Types/api'
import { Customer } from '@Types/customer'
import { Orders } from '@Types/order'
import { Avatar } from '@material-tailwind/react'
import Link from 'next/link'
import * as React from 'react'




function NavBarSearchInput() {



   const OrderLabel = ({ order }: { order: Orders }) => {
      return (
         <Link href={`/v3/ord/orders?selected=${order._id}`}>
            <div className='flex gap-3 items-center'>
               <Avatar size='md' src={ImageUrlConfig(order.cover_photo.href, 'w_75,h_75,q_auto,c_scale,r_max')} />
               <div className="">
                  <p>{order.program_name} {order.order_name}</p>
                  <p>{order.customer.user_name}</p>
                  <p>{order.status}</p>
               </div>
            </div>
         </Link>
      )
   }

   const CustomerLabel = ({ customer }: { customer: Customer }) => {
      return (
         <Link href={'#'}>
            <p className='text-md'>{customer.name}</p>
            <p>{customer.email}</p>
         </Link>
      )
   }



   const loadOptions = async (text: any) => {
      const options: any[] = []
      try {
         const { data }: { data: ApiResponse<any> } = await Axios.get(`/api/v2/search/global?search=${text}`)
         const orders: Orders[] = data.data?.orders
         const customers: Customer[] = data.data?.customers

         if (orders.length) {
            options.push({ label: <p className='border-b'>Orders</p>, value: "" })
            orders.map((order) => {
               const data = {
                  label: <OrderLabel order={order} />,
                  value: order._id
               }
               options.push(data)
            })
         }
         if (customers.length) {
            options.push({ label: <p className='border_b'>Customers</p>, value: "" })
            customers.map((customer) => {
               const data = {
                  label: <CustomerLabel customer={customer} />,
                  value: customer._id
               }
               options.push(data)
            })
         }



         return options
      } catch (error) {
         console.log(error)
      }






      // console.log('first')
      // const orders = generateExpandedOrders(10)

      // const x: AsyncOption[] = orders.map((item) => ({
      //    label: <div>
      //       <p>{item.order_name}</p>
      //       <p>{item.program_name}</p>
      //    </div>,
      //    value: item._id
      // }))

      // return x
   }

   return (
      <div className="w-60 flex gap-2">
         <AsyncSelectInput
            loadOptions={loadOptions}
            inputProps={{
               name: "search", onChange: () => { }, value: "",
               placeholder: "Search",
               type: ""
            }}
         />
      </div>
   )
}

export default NavBarSearchInput