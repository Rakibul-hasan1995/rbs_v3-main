import React from 'react'
import IconButton from './IconButton'
import useSearchParamsHook from '@Lib/global/useSearchParams'
import { BsGrid1X2 } from 'react-icons/bs'
import { ImTable } from 'react-icons/im'


function LayoutButton() {

   const { pushQuery, searchParams } = useSearchParamsHook()
   const show = searchParams.get('show') || 'grid'
   const handleLayoutChange = () => {
      pushQuery({ show: show == 'grid' ? 'table' : "grid" })
   }



   return (

      <IconButton color='white'
         className='rounded-md dark:bg-black dark:text-blue-gray-50'
         onClick={handleLayoutChange}
      >    
         {show !== 'grid' ? <BsGrid1X2 className='w-4 h-4' /> : <ImTable className='w-5 h-5' />}
      </IconButton>
   )
}

export default LayoutButton
