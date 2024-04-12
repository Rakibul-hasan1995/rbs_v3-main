
'use client'
import OrdersNav from '@/components/organisms/orders/OrdersNav'
import OrderTable from '@/components/organisms/orders/OrdersTable'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function Page() {
  const searchParams= useSearchParams()
  const show = searchParams.get('show') || 'grid'
  return (
    <div className='px-3 pt-3'>
      <OrdersNav />
     {show == 'grid' ? '' : <OrderTable />}
    </div>
  )
}

export default Page