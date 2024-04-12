'use client'
import { SharedContextProvider } from '@/context/sharedContext'
import React from 'react'
import useOrderApi from './useOrderApi'

type Props = {
   children: React.ReactNode
}


function OrderLayout({ children }: Props) {
   return (
      <SharedContextProvider>
         <WithContext>
            {children}
         </WithContext>
      </SharedContextProvider>
   )
}

export default OrderLayout

const WithContext = ({ children }: Props) => {
   useOrderApi()
   return children
}