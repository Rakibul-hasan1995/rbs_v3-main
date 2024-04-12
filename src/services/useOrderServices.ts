import { Axios } from '@Lib/global/axios-config'
import { objToQueryString } from '@Lib/global/queryString'
import { ApiResponse } from '@Types/api'
import { OrderQueryParams, OrderRaw, OrdersExpand, orderUpdateBody } from '@Types/order'
import * as React from 'react'
import toast from 'react-hot-toast'


interface Arg {
   setStates?: React.Dispatch<React.SetStateAction<OrderState>>
}

type OrdersApiResponse = ApiResponse<OrdersExpand[]>

export type OrderState = {
   orders?: OrdersApiResponse;
   order?: OrdersExpand;
   searchMode?: boolean;
   loadingOrders: boolean;
   loadingOrdersUpdate: boolean;
   checkedItems?: any
}

export type OrderContext = {
   state: OrderState
   setState: React.Dispatch<React.SetStateAction<OrderState>>
}

function useOrderServices(arg: Arg) {
   const { setStates } = arg


   const fetchOrders = async (queryObj: OrderQueryParams): Promise<OrdersApiResponse | undefined> => {
      try {
         if (setStates) {
            setStates((prev) => ({ ...prev, loadingOrders: true }))
         }

         const query = objToQueryString(queryObj)
         const { data }: { data: OrdersApiResponse } = await Axios.get(`/api/v2/orders?${query}`)

         if (setStates) {
            setStates((prev) => ({ ...prev, orders: { ...data } }))
         }
         return data
      } catch (error: any) {
         console.log(error)
         toast.error(error.message || 'error in fetch orders')
      } finally {
         if (setStates) {
            setStates((prev) => ({ ...prev, loadingOrders: false }))
         }
      }
   }

   const updateBulkOrders = async (body: orderUpdateBody): Promise<OrdersApiResponse> => {
      try {
         if (setStates) {
            setStates((prev) => ({ ...prev, loadingOrdersUpdate: true }))
         }

         const { data }: { data: ApiResponse<any> } = await Axios.post(`/api/v2/orders/update`, body)
         toast.success(data.message)
         return data
      } catch (error: any) {
         toast.error(error.message || '! error in update orders')
         throw error
      } finally {
         if (setStates) {
            setStates((prev) => ({ ...prev, loadingOrdersUpdate: false }))
         }
      }
   }
   const updateOrder = async (id: string, body: Partial<OrderRaw>): Promise<ApiResponse<undefined>> => {
      try {
         if (setStates) {
            setStates((prev) => ({ ...prev, loadingOrdersUpdate: true }))
         } const { data }: { data: ApiResponse<any> } = await Axios.put(`/api/v2/orders/${id}`, body)
         toast.success(data.message)
         return data
      } catch (error: any) {
         toast.error(error.message || '! error in update orders')
         throw error
      } finally {
         if (setStates) {
            setStates((prev) => ({ ...prev, loadingOrdersUpdate: false }))
         }
      }
   }





   return { fetchOrders, updateBulkOrders,  updateOrder }
}

export default useOrderServices