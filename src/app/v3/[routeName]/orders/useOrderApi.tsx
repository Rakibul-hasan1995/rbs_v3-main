'use client'
import { useSharedContext } from '@/context/sharedContext'
import useOrderServices, { OrderContext } from '@/services/useOrderServices'

import useSearchParamsHook from '@Lib/global/useSearchParams'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

function useOrderApi() {
   const { state, setState }: OrderContext = useSharedContext()

   const orders = state?.orders?.data

   const { fetchOrders, } = useOrderServices({ setStates: setState })

   const { pushQuery } = useSearchParamsHook()

   const searchParams = useSearchParams()

   const selectedId = searchParams.get('selected')
   const page = searchParams.get('page') || "1"
   const status: any = searchParams.get('status') || ""
   const limit = searchParams.get('limit') || '100'
   const sort_key = searchParams.get('sort_key') || ''
   const sort_type: any = searchParams.get('sort_type') || ''
   const search: any = searchParams.get('search') || ''
   const search_by: any = searchParams.get('search_by') || ''
   const expand: any = searchParams.get('expand') || 'true'
   const filter_key: any = searchParams.get('filter_key') || 'status'
   const filter_value: any = searchParams.get('filter_value') || ''
   // const filter_value: any = searchParams.get('filter_value') || 'Invoiced'
   const refresh: any = searchParams.get('refresh') || ''



   useEffect(() => {
      let x: any = { page, limit, sort_key, sort_type, search, search_by, expand, filter_key, filter_value, status }
      const query: any = {}
      Object.keys(x).map((key) => {
         if (x[key]) {
            return query[key] = x[key]
         }
      })
      pushQuery(query)
      fetchOrders(query)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, limit, status, sort_key, sort_type, search, search_by, expand, refresh])

  


   useEffect(() => {
      if (selectedId) {
         handleSelectItem(selectedId)
      } else {
         setState((prev) => ({ ...prev, order: undefined }))
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedId, orders])

   const handleSelectItem = async (id: string) => {

      if (orders?.length) {
         const find = orders.find(item => item._id == id)
         if (find) {
            setState((prev) => ({ ...prev, order: find }))
         } else if (id) {
            // await fetchCustomerById(`${id}`)
         }
      } else {
         // await fetchCustomerById(`${id}`)
      }
   }

   return { handleSelectItem }
}

export default useOrderApi